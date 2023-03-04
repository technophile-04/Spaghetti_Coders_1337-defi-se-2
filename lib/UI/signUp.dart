import 'package:flutter/material.dart';
import 'package:coc_app/auth/auth.dart';

class SignUp extends StatefulWidget {
  const SignUp({Key? key}) : super(key: key);

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final _auth = AuthService();
  final _formKey = GlobalKey<FormState>();
  String email = "";
  String pass = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('SignIn')),
      body: Container(
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: const InputDecoration(hintText: 'Enter Email'),
                validator: (val) => val!.isEmpty? 'Enter an Email' : null,
                onChanged: (val){
                  setState(() {
                    email = val;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(hintText: 'Enter Password'),
                obscureText: true,
                validator: (val) => val!.length<6? 'Password minimum 6 chars' : null,
                onChanged: (val){
                  setState(() {
                    pass = val;
                  });
                },
              ),
              TextFormField(
                decoration: const InputDecoration(hintText: 'Re-enter Password'),
                obscureText: true,
                validator: (val) => val!=pass? 'Passwords don\'t match' : null,
                onChanged: (val){},
              ),
              TextButton(
                  onPressed: (){
                    if(_formKey.currentState!.validate()) {
                      final result = _auth.signUpEmailPassword(email, pass);
                      print(result);
                    }
                    else{}
                  },
                  child: Text("Submit")
              ),
              SizedBox(height: 10),
              Text("Or Using Google: "),
              IconButton(onPressed: (){
                final result = _auth.handleSignIn();
                print(result);
              }, icon: Icon(Icons.g_mobiledata))
            ],
          ),
        ),
      ),
    );
  }
}
