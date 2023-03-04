import 'package:firebase_auth/firebase_auth.dart';
import 'package:coc_app/UI/bottomBar.dart';
// import 'package:hackniche_finance/UI/getStarted.dart';
import 'package:coc_app/UI/login.dart';
// import 'package:hackniche_finance/UI/signUp.dart';
// import 'package:hackniche_finance/UI/changeLang.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Wrapper extends StatelessWidget {
  const Wrapper({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<User?>(context);

    if(user == null) {
      return const LoginPage();
    }
    return const BottomBarStart();
  }
}
