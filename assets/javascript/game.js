$(document).ready(function () {

    // Array of objects that containes all the fighter options for the game. Add or remove fighteres here!
    var fighters = {
        Boba: {
            name: "Boba Fett",
            img: "assets/images/bulba-fet-icon.png",
            healthPoints: "150",
            attackPower: "3",
            counterAttackPower: "35"
        },
        Darth: {
            name: "Darth Vader",
            img: "assets/images/Darth-Vader-icon.png",
            healthPoints: "180",
            attackPower: "2",
            counterAttackPower: "42"
        },
        R2D2: {
            name: "R2-D2",
            img: "assets/images/R2-D2-icon.png",
            healthPoints: "125",
            attackPower: "6",
            counterAttackPower: "26"
        },
        Clone: {
            name: "Clone Soldier",
            img: "assets/images/clone-icon.png",
            healthPoints: "150",
            attackPower: "4",
            counterAttackPower: "35"
        }
    }

    // Switch variable to allow fighter card to only be chosed once.
    var clickedCard = false;

    // Varabilve that links to the properties of the selected object, and is pushed to the HTML.
    var fighterCard;

    // Var i is the players character selection
    var i;
    var attackPower;
    var attackHP;

    // j is the defender selection
    var j;
    var defenderHP;
    var defendPower;


    // Hides the selected character and enemy character cards until they are specified by the user.
    $(".yourFighter").hide();
    $(".enemyCard").hide();

    // Stores an Array of fighter Names, so the .length can be used in a for loop.
    var theFighters = Object.keys(fighters);

    //  variable that counts remaining enemies.
    var remainingDefenders = theFighters.length;

    // For Loop that turns the Objects into cards for the length of the array. Allows to add or remove fighters without changing code.
    for (i = 0; i < theFighters.length; i++) {
        // creates div for the cards
        fighterCard = $("<div>");
        // specifies class as fighterCard, and the ID as the number in the array.
        fighterCard.attr({
            class: "fighterCard",
            id: i
        });
        // Creates fighter image div and pushes it to the HTML
        var fighterImg = $("<img>");
        fighterImg.attr("src", fighters[Object.keys(fighters)[i]].img);
        fighterCard.append(fighterImg);
        // Appends the fighter name
        fighterCard.append(fighters[Object.keys(fighters)[i]].name + "<br>");
        // appends the fighteres HP
        fighterCard.append(fighters[Object.keys(fighters)[i]].healthPoints);
        $(".fighterOptions").append(fighterCard);
    }

    // Listens for the user to click a card.
    $(".fighterCard").on("click", function () {
        // only allows user to select a fighter if a card has not already been clicked.
        if (clickedCard === false) {
            // Grabs the id of the clicked card, which is its index # in the fighters array. This is the link to the data for each fighter.
            i = this.id;
            // Stores the fighters attack power in a variable, taken from the array.
            attackPower = fighters[Object.keys(fighters)[i]].attackPower;
            // Shows the div that holds the selected fighter, which is hidden on load.
            $(".yourFighter").show();
            // Grabs the fighter image from the array, adds to the DOM by adding Img SRC.
            $(".fighterImage").attr("src", fighters[Object.keys(fighters)[i]].img);
            // Adds fighter name to the DOM.
            $(".fighterName").text(fighters[Object.keys(fighters)[i]].name);
            // stores the fighter HP in attackHP variable. Taken from array.
            attackHP = fighters[Object.keys(fighters)[i]].healthPoints;
            // Prints HP value to the dom.
            $(".fighterHP").text(attackHP);
            // Changes text on the page so the user knows that its time to select an enemy.
            $("#chooseFighter").text("Enemies Available to attack.")
            // Hides the clicked card, as the user cannot fight itself.
            $("#" + [i]).hide();
            // Changes value of clicked card, so that the next fighterCard click will select an enemy.
            clickedCard = true;
            // If the user has already selected a hero, allows them to pick an enemy card.
        } else if (clickedCard === true) {
            // Stores the ID of clicked card, which is the index of the array. Used to link HTML to the fighters array.
            j = this.id;
            // Grabs counter attack power from the array, and stores it the the defendPower variale.
            defendPower = fighters[Object.keys(fighters)[j]].counterAttackPower;
            // Shows the enemy card, which is hidden on load.
            $(".enemyCard").show();
            // Grabs the enemy image by changing the SRC of the img on the DOM.
            $(".enemyImage").attr("src", fighters[Object.keys(fighters)[j]].img);
            // Prints the enemy name to the DOM.
            $(".enemyName").text(fighters[Object.keys(fighters)[j]].name);
            // Grabs defender hp from the array, stores in the defenderHP variable.
            defenderHP = fighters[Object.keys(fighters)[j]].healthPoints;
            $(".enemyHP").text(defenderHP);
            // Hides clicked card, so that user can only selecy each enemy once.
            $("#" + [j]).hide();
            // Changes value of clicked card to null, so that clicking fighterCard will do nothing. 
            clickedCard = null;
        } else { }

    });

    $(".fightButton").on("click", function () {


        if (defenderHP > 0 && attackHP > 0) {
            $("#gameDialogue").text("You attacked " + fighters[Object.keys(fighters)[j]].name + " for " + attackPower + " damage!");
            defenderHP = defenderHP - attackPower;
            $(".enemyHP").text(defenderHP);
            attackPower = attackPower * 2;

            if (defenderHP > 0) {
                attackHP = attackHP - defendPower;
                $(".fighterHP").text(attackHP);
                $("#gameDialogue").append("<br>" + "You were attacked for " + defendPower + " damage!");
            }
        }

        if (defenderHP <= 0 && attackHP > 0) {
            $("#gameDialogue").text("You defeated " + fighters[Object.keys(fighters)[j]].name + ", pick your next opponent!");
            $(".enemyCard").hide();
            remainingDefenders--;
            console.log(remainingDefenders);
            clickedCard = true;

            if (remainingDefenders == 1) {
                $("#gameDialogue").html(" <h1> Game over, you won! Refresh to play again! </h1>");
                $(".fightButton").hide();
            }


        }

        if (attackHP <= 0) {
            alert("You lose!");
        }



    });

});