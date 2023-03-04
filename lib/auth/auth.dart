import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final _googleSignIn = GoogleSignIn();

  Stream<User?> get user{
    return _auth.authStateChanges();
  }

  void handleSignOut() async{
    _auth.signOut();
  }

  Future<User?> handleSignIn() async {
    GoogleSignInAccount? googleSignInAccount;
    try {
      googleSignInAccount = await _googleSignIn.signIn();
    } catch (error) {
      print(error);
    }
    final GoogleSignInAuthentication googleSignInAuthentication = await googleSignInAccount
    !.authentication;
    final AuthCredential credential = GoogleAuthProvider.credential(
      accessToken: googleSignInAuthentication.accessToken,
      idToken: googleSignInAuthentication.idToken,
    );
    final UserCredential authResult = await _auth.signInWithCredential(
        credential);
    final User? user = authResult.user;
    if (user != null) {
      assert(!user.isAnonymous);
      assert(await user.getIdToken() != null);
      final User? currentUser = _auth.currentUser;
      assert(user.uid == currentUser!.uid);
      return user;
    }
    else {
      return null;
    }
  }

  Future<User?> signUpEmailPassword(String email, String pass) async {
    try {
      User? user = (await _auth.createUserWithEmailAndPassword(email: email, password: pass)).user;
      return user;
    } catch (e) {
      print(e.toString());
      return null;
    }
  }

  Future<User?> signIpWithEmailPassword(String email, String pass) async {
    try {
      User? user = (await _auth.signInWithEmailAndPassword(email: email, password: pass)).user;
      return user;
    } catch (e) {
      print(e.toString());
      return null;
    }
  }

}