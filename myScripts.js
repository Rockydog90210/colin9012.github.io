            let totalMoney = 0;
            let clickPower = 0;
            let autoClickPower = 0;
            dragonFrame = 1; // so the computer knows witch frame to display when you click
            x = 30;
            
            const moneyButton = document.getElementById("moneyButton") // defines my buttons 
            
            const totMoney = document.querySelector("p");
            const doubleClickButtonX2 = document.getElementById("clickPowerButtonX2");
            const doubleClickButtonX4 = document.getElementById("clickPowerButtonX4");
            const doubleClickButtonX8 = document.getElementById("clickPowerButtonX8");
            
            const autoClickerX1 = document.getElementById("autoClickButtonX1");
            const autoClickerX2 = document.getElementById("autoClickButtonX2");
            
            moneyButton.addEventListener("click", updateNum);
            
            doubleClickButtonX2.addEventListener("click", doubleClickPowerX2);
            doubleClickButtonX4.addEventListener("click", doubleClickPowerX4);
            doubleClickButtonX8.addEventListener("click", doubleClickPowerX8);
            
            autoClickerX1.addEventListener("click", autoClickX1);
            autoClickerX2.addEventListener("click", autoClickX2);
            
            
            
            
            function updateNum(){ //updates total money and plays clicking animations 
                
                checkClickPower(); // checks your click power to see how much your money needs to incress
                totMoney.textContent = totalMoney; //updates the number
                dragonFlap();// makes the draon flap her wings
            }
            
            
             // start test functions
             function buyButton(){ //name up for change, this function "buys" the button
                updateCostButton();//would update 
                subtractMoney();// would subtract the cost of the button from your money 
            }

            function updateCostButton() { //updates the cost of the button
                x = Math.round(x * 1.05)
            }

            function subtractMoney(){ // subtracts the money
                totMoney -= x;

            }
            // end test functions blah

            
            
            function checkClickPower(){ //checks your click power to see how much your total momney needs to go up
                if (clickPower === 0){
                    for (var i = 0; i < 1; i++){
                            ++totalMoney;    
                        }
                    
                }else if(clickPower ===2){//checks what your click power is 
                        for (var i = 0; i < 2; i++){
                            ++totalMoney;    
                        }    
                    }else if(clickPower === 4){
                        for (var i = 0; i < 4; i++){
                            ++totalMoney;    
                        }
                        
                    }else if(clickPower === 8){
                        for (var i = 0; i < 8; i++){
                            ++totalMoney;    
                        }
                    }    
                
            }
            
            
            
            function doubleClickPowerX2(){ //double click button
                if (totalMoney >= 50) {
                    clickPower = 2;
                    totalMoney -= 50;
                     
                    
                    totMoney.textContent = totalMoney;// reloads textcontent
                    
                    document.getElementById("clickPowerButtonX2").innerHTML = "sold!";
                    document.getElementById("clickPowerButtonX2").style.backgroundColor = "darkRed";
                    document.getElementById("clickPowerButtonX2").style.pointerEvents = "none";
                    document.getElementById("clickPowerButtonX4").style.display = "inline";
                    
                    
                }            
            }
            
             function doubleClickPowerX4(){ //double click button
                if (totalMoney >= 200) {
                    clickPower = 4;
                    totalMoney -= 200;
                     
                    
                    totMoney.textContent = totalMoney;// reloads textcontent
                    
                    document.getElementById("clickPowerButtonX4").innerHTML = "sold!";
                    document.getElementById("clickPowerButtonX4").style.backgroundColor = "darkRed";
                    document.getElementById("clickPowerButtonX4").style.pointerEvents = "none";
                    document.getElementById("clickPowerButtonX8").style.display = "inline";
                    
                }            
            }
            
            function doubleClickPowerX8(){ //double click button
                if (totalMoney >= 500) {
                    clickPower = 8;
                    totalMoney -= 500;
                     
                    
                    totMoney.textContent = totalMoney;// reloads textcontent
                    
                    document.getElementById("clickPowerButtonX8").innerHTML = "sold!";
                    document.getElementById("clickPowerButtonX8").style.backgroundColor = "darkRed";
                    document.getElementById("clickPowerButtonX8").style.pointerEvents = "none";
                    
                    
                }            
            }
            
            function autoClickX1(){ //autoclickers 
                if (totalMoney >= 30) {
                    totalMoney -= 30;
                    autoClickPower = 1;
                    totMoney.textContent = totalMoney;
                    setInterval(autoClick, 1000); 
                
                    
                    document.getElementById("autoClickButtonX1").innerHTML = "sold!";
                    document.getElementById("autoClickButtonX1").style.backgroundColor = "darkRed";
                    document.getElementById("autoClickButtonX1").style.pointerEvents = "none";
                    document.getElementById("autoClickButtonX2").style.display = "inline"; 
                    }
                    
                }
                
                function autoClickX2(){
                if (totalMoney >= 100) {
                    totalMoney -= 100;
                    autoClickPower = 2
                    totMoney.textContent = totalMoney;
                
                    
                    document.getElementById("autoClickButtonX2").innerHTML = "sold!";
                    document.getElementById("autoClickButtonX2").style.backgroundColor = "darkRed";
                    document.getElementById("autoClickButtonX2").style.pointerEvents = "none"; 
                    }
                    
                }
                
            
            function autoClick(){
                CheckAutoClick()
                totMoney.textContent = totalMoney;
            }
            

            function CheckAutoClick(){
                if (autoClickPower === 1){
                    ++totalMoney;
                    totMoney.textContent = totalMoney;

                }else if (autoClickPower === 2){
                    for (var i = 0; i < 5; i++){
                        ++totalMoney;}
                    totMoney.textContent = totalMoney;
                }


            }
            
            function dragonFlap(){ //animates the main image 
                if (dragonFrame === 1){
                    document.getElementById("moneyButton").src ="dragonflap.png";
                    dragonFrame = 2;
                    
                }else if (dragonFrame = 2){
                    document.getElementById("moneyButton").src = "dragon.png";
                    dragonFrame = 1; 
                }
            }
    
        
        