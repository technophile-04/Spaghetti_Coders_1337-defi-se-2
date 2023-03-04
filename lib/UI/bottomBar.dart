import 'package:flutter/material.dart';
import 'package:coc_app/UI/kyc.dart';

class BottomBarStart extends StatefulWidget {
  const BottomBarStart({Key? key}) : super(key: key);

  @override
  State<BottomBarStart> createState() => _BottomBarStartState();
}

class _BottomBarStartState extends State<BottomBarStart> {
  int _selectedIndex = 0;

  late List<Widget> pages ;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    pages = [
      const KYC(),
      // const Income(),
      // const Profile()
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff141332),
      body: SafeArea(child: pages[_selectedIndex]),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Color(0xff6359E9),
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.grey,
        onTap: (curentIndex){
          setState(() {
            _selectedIndex = curentIndex;
          });
        },
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              icon: Icon(Icons.home),
            label: 'home'
          ),
          BottomNavigationBarItem(
              icon: Icon(Icons.wallet),
              label: 'Income'
          ),
          BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'try'
          ),

        ],
      ),
    );
  }
}
