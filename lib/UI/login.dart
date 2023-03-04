import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:coc_app/UI/getStarted.dart';
import 'package:coc_app/UI/signUp.dart';
import 'package:coc_app/auth/auth.dart';
import 'package:get/get.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _auth = AuthService();
  final _formKey = GlobalKey<FormState>();
  String email = "";
  String pass = "";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff141332),
      appBar: AppBar(
        leading: IconButton(
          onPressed: ()=>Get.to(GetStarted()),
          icon: Icon(Icons.arrow_back_ios),
        ),
        title: Text('Login'),
        backgroundColor: Colors.transparent,elevation: 0,),
      body: Container(
        height: double.infinity,
        padding: const EdgeInsets.all(10),
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                // Hero(
                //   createRectTween: (Rect? begin, Rect? end) {
                //     return MaterialRectCenterArcTween(begin: begin, end: end);
                //   },
                //   tag: 'logo',
                //   child: Padding(
                //       padding: const EdgeInsets.fromLTRB(10, 100, 10, 10),
                //       child: Image.asset('assets/logo.png',scale: 0.5,)
                //   ),
                // ),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                      color: const Color(0xff1d1d40),
                      borderRadius: BorderRadius.circular(20)
                  ),
                  child: TextFormField(
                    style: GoogleFonts.poppins(color: Colors.white),
                    decoration: InputDecoration(hintText: 'Enter Email',hintStyle: GoogleFonts.poppins(fontSize: 24,color: Colors.blueGrey),),
                    validator: (val) => val!.isEmpty? 'email not empty' : null,
                    onChanged: (val){
                      setState(() {
                        email = val;
                      });
                    },
                  ),
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                      color: const Color(0xff1d1d40),
                      borderRadius: BorderRadius.circular(20)
                  ),
                  child: TextFormField(
                    style: GoogleFonts.poppins(color: Colors.white),
                    decoration: InputDecoration(hintText: 'Enter Password',hintStyle: GoogleFonts.poppins(fontSize: 24,color: Colors.blueGrey),),
                    obscureText: true,
                    validator: (val) => val!.length<6? 'Password minimum 6 chars' : null,
                    onChanged: (val){
                      setState(() {
                        pass = val;
                      });
                    },
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Google Login",style: GoogleFonts.poppins(fontSize: 20,color: Colors.white),),
                    const SizedBox(width: 5,),
                    Container(
                      width: 70,
                      height: 55,
                      padding: const EdgeInsets.fromLTRB(1,0,1,1),
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.lightBlue),
                        shape: BoxShape.circle,
                      ),
                      child: IconButton(onPressed: (){
                        final result = _auth.handleSignIn();
                        print(result);
                      }, icon: const Icon(Icons.g_mobiledata,size: 40,color: Colors.white,)),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                ElevatedButton(
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(const Color(0xff03c9d7)),),
                    onPressed: (){
                      if(_formKey.currentState!.validate()) {
                        final result = _auth.signIpWithEmailPassword(email, pass);
                        print(result);
                      }
                      else{}
                    },
                    child: Text("Submit",style: GoogleFonts.poppins(fontSize: 24,color: Colors.white),)
                ),
                const SizedBox(height: 10),
                TextButton(onPressed: (){Get.to(SignUp());}, child: Text("Sign-Up",style: GoogleFonts.poppins(fontSize: 20),)),

              ],
            ),
          ),
        ),
      ),
    );
  }
}
