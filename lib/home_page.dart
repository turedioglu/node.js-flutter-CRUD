import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          MaterialButton(onPressed: (){}, child: Text("CREATE"),),
          MaterialButton(onPressed: (){}, child: Text("READ"),),
          MaterialButton(onPressed: (){}, child: Text("UPDATE"),),
          MaterialButton(onPressed: (){}, child: Text("DELETE"),),
        ],
      ),
    );
  }
}
