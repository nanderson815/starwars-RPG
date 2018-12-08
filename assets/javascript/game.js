$(document).ready(function () {

    var fighters = {
        Boba: {
            name: "Boba Fett",
            img: "assets/images/bulba-fet-icon.png",
            healthPoints: "150",
            attackPower: "8",
            counterAttackPower: "22"
        },
        Darth: {
            name: "Darth Vader",
            img: "assets/images/Darth-Vader-icon.png",
            healthPoints: "200",
            attackPower: "9",
            counterAttackPower: "25"
        },
        R2D2: {
            name: "R2-D2",
            img: "assets/images/R2-D2-icon.png",
            healthPoints: "125",
            attackPower: "10",
            counterAttackPower: "17"
        },
        Clone: {
            name: "Clone Soldier",
            img: "assets/images/clone-icon.png",
            healthPoints: "150",
            attackPower: "7",
            counterAttackPower: "19"
        }
    }

    var clickedCard = false;
    var clickedEnemyCard = false;
    var fighterCard;

    // Var i the players character selection
    var i;
    var attackPower;
    var attackHP;

    // j is the defender selection
    var j;
    var defenderHP;
    var defendPower;



    $(".yourFighter").hide();
    $(".enemyCard").hide();

    // Stores an Array of fighter Names, so the .length can be used in a for loop.
    var theFighters = Object.keys(fighters);
    console.log(theFighters);

    for (i = 0; i < theFighters.length; i++) {
        fighterCard = $("<div>");
        fighterCard.attr({
            class: "fighterCard",
            id: i
        });
        var fighterImg = $("<img>");
        fighterImg.attr("src", fighters[Object.keys(fighters)[i]].img);
        fighterCard.append(fighterImg);
        fighterCard.append(fighters[Object.keys(fighters)[i]].name + "<br>");
        fighterCard.append(fighters[Object.keys(fighters)[i]].healthPoints);
        $(".fighterOptions").append(fighterCard);
    }

    // Runs the figher action.
    $(".fightButton").on("click", function () {
        console.log();

    });

    $(".fighterCard").on("click", function () {
        if (clickedCard === false) {
            i = this.id;
            attackPower = fighters[Object.keys(fighters)[i]].attackPower;
            $(".yourFighter").show();
            $(".fighterImage").attr("src", fighters[Object.keys(fighters)[i]].img);
            $(".fighterName").text(fighters[Object.keys(fighters)[i]].name);
            attackHP = fighters[Object.keys(fighters)[i]].healthPoints;
            $(".fighterHP").text(attackHP);
            $("#chooseFighter").text("Enemies Available to attack.")
            $("#" + [i]).hide();
            clickedCard = true;
        } else if (clickedCard === true) {
            j = this.id;
            defendPower = fighters[Object.keys(fighters)[j]].counterAttackPower;
            $(".enemyCard").show();
            $(".enemyImage").attr("src", fighters[Object.keys(fighters)[j]].img);
            $(".enemyName").text(fighters[Object.keys(fighters)[j]].name);
            defenderHP = fighters[Object.keys(fighters)[j]].healthPoints;
            $(".enemyHP").text(defenderHP);
            $("#" + [j]).hide();
            clickedCard = null;
        } else { }

    });

    $(".fightButton").on("click", function () {
        if (attackHP <= 0) {
            alert("You lose!");
        }
        
        if (defenderHP > 0 && attackHP > 0) {
            $("#gameDialogue").text("You attacked " + fighters[Object.keys(fighters)[j]].name + " for " + attackPower + " damage!");
            defenderHP = defenderHP - attackPower;
            $(".enemyHP").text(defenderHP);
            attackPower = attackPower * 2;

            attackHP = attackHP - defendPower;
            $(".fighterHP").text(attackHP);
            $("#gameDialogue").append("<br>" + "You were attacked for " + defendPower + " damage!");
        } 
        
        if (defenderHP <= 0 && attackHP > 0) {
            $("#gameDialogue").text("You defeated " + fighters[Object.keys(fighters)[j]].name + ", pick your next opponent!");
            $(".enemyCard").hide();
            clickedCard = true;
        }

    });

});