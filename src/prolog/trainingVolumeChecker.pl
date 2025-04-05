INFORMATION ABOUT THE DOMAIN (VOLUME PER SESSION PER MUSCLE GROUP FOR HYPERTROPHY):

Source in Pt-br
- https://www.instagram.com/p/CjarKbcrU7q/

Variables to consider:
- Number of sets per session per muscle group
- Load progression
- Bodyweight increase
- Rest

Volume less than 5:     Below optimal.

Volume from 5 to 10:    Ideal if there is load progression and bodyweight increase.
                        If there is no load progression, rest between 2–5 minutes between sets.
                        If already resting 2–5 minutes, increase the number of sets by 20% and wait 12 to 16 weeks.
                        If there is load progression but weight is not increasing, review your diet.

Volume from 10 to 20:   Ideal if not resting more than 2 minutes between sets and if there is load and weight progression.
                        If resting more than 2 minutes, split into two workouts and wait 12 to 16 weeks.

Volume above 20:        Ideal if there is load and weight progression.
                        If no load progression, cut sets in half, split into two workouts and wait 12 to 16 weeks.
*/

/* Dynamic variables to store user answers */
:- dynamic q/2.
:- dynamic n/1.

/* Rules */
volume(low) :-  		n(Sets), Sets < 5.

volume(high_ideal) :-   n(Sets), Sets > 20,
                        is_true("Are you progressing in load"),
						is_true("Is your bodyweight increasing").

volume(high_diet) :-    n(Sets), Sets > 20, 
                        is_true("Are you progressing in load").

volume(high) :-         n(Sets), Sets > 20.

volume(ideal) :-        is_true("Are you progressing in load"), 
                        is_true("Is your bodyweight increasing").

volume(diet) :-         is_true("Are you progressing in load").

volume(split) :- 		n(Sets), Sets > 10, Sets < 20,
    					is_true("Are you resting more than 2 minutes between sets").					

volume(increase) :- 	is_true("Are you resting between 2 and 5 minutes between sets").

volume(rest).

/* Main menu */
start :-
    nl,
    writeln("Welcome to the Hypertrophy Training Volume Recommendation System"),
    nl,
    menu.

/* Show menu options */
menu :-
    writeln("Choose an option:"),
    nl,
    writeln("1 - General recommendation."),
    writeln("2 - Check if the volume I'm doing is ideal."),
    nl,
    read(Option),
    (   validate_option(Option) -> 
        choice(Option) 
    ; 
    	nl,
        writeln("Invalid option. Please try again."),
        nl,
        menu
    ).

validate_option(Option) :- 
    Option == 1 ; Option == 2.

/* Option logic */
choice(1) :-
    nl,
    writeln("General recommendation for hypertrophy:"),
    nl,
    writeln("- Perform 5 to 10 sets per muscle group per session."),
    writeln("- Rest between 2 and 5 minutes between sets."),
    writeln("- Aim to progress in load over time."),
    writeln("- Wait 12 to 16 weeks before evaluating results."),
    writeln(""),
    writeln("Note: It is recommended to consult a physical education and nutrition professional."),
    nl.

choice(2) :-
    nl,
    writeln("Let's check if the training volume you're doing is ideal."),
    nl,
    ask_sets,
    evaluate.

/* Ask for numerical input */
ask_sets :- 
    writeln("How many sets do you perform per muscle group per session?"),
    read(Sets),
    (
    	number(Sets) -> assert(n(Sets))
    ;   
    	nl,
    	writeln("Please enter a valid number."), 
    	nl,
    	ask_sets
    ).

/* User feedback */
evaluate :- clean, volume(X),
    		nl,
    		(
                X = low ->       writeln("Your training volume is too low, you’re probably leaving gains on the table."), 
                                 nl, 
                                 writeln("Recommendations:"),
                                 nl,
                                 writeln("- Perform 5 to 10 sets per muscle group per session."),
                                 writeln("- Rest 2 to 5 minutes between sets."),
                                 writeln("- Ensure load progression.");

                X = ideal ->     writeln("Your training volume is appropriate.");

                X = diet ->      writeln("Your training volume is appropriate, but review your diet."),
                                 nl, 
                                 writeln("Recommendations:"),
                                 nl,
                                 writeln("- Consume 1.6 to 2g of protein per kg of body weight per day."),
                                 writeln("- Add 500 kcal more than your daily expenditure.");

                X = high_ideal -> writeln("Your training volume might be ideal, but be aware it is considered high."),
                                 nl, 
                                 writeln("Recommendations:"),
                                 nl,
                                 writeln("- Consider reducing volume if you hit a plateau.");

                X = high ->      writeln("Your training volume is too high and might be hindering your progress."), 
                                 nl, 
                                 writeln("Recommendations:"),
                                 nl,
                                 writeln("- Cut your sets in half."),
                                 writeln("- Split into two workouts."),
                                 writeln("- Wait 12 to 16 weeks."),
                                 writeln("- Check if load is progressing.");

            	X = high_diet -> writeln("Your volume is appropriate but high, and you should review your diet."), 
                                 nl,
                                 writeln("Recommendations:"),
                                 nl,
                                 writeln("- Consume 1.6 to 2g of protein per kg of body weight per day."),
                                 writeln("- Add 500 kcal more than your daily expenditure.");

                X = increase ->  writeln("Your volume is low and might be holding you back."), 
                                 nl, 
                                 writeln("Recommendations:"),
                                 nl,
                                 writeln("- Increase your sets by 20%."),
                                 writeln("- Wait 12 to 16 weeks."),
                                 writeln("- Ensure load progression.");

                X = rest ->      writeln("Your volume might be fine, but if load isn’t progressing, check your rest time."), 
                                 nl, 
                                 writeln("Recommendations:"),
                                 nl,
                                 writeln("- Rest between 2 and 5 minutes between sets."),
                                 writeln("- Ensure load progression.");

                X = split ->     writeln("Your training volume is high."), 
                                 nl, 
                                 writeln("Recommendations:"),
                                 nl,
                                 writeln("- Split into two workouts."),
                                 writeln("- Wait 12 to 16 weeks."),
                                 writeln("- Ensure load progression.")
            ),
        	nl,
        	writeln("Note: It is recommended to consult a physical education and nutrition professional."),
			nl.

/* Yes/No question */
is_true(Q) :-
    ask(Q);
    q(Q, yes).

ask(Q) :-
    not(q(Q,_)),
    format("~s? (yes/no)\n", [Q]),
    read(X), 
    (   validate_response(X) -> assert(q(Q, X)),
        q("Are you resting more than 2 minutes between sets", no) ->  
            assert(q("Are you resting between 2 and 5 minutes between sets", no)),
        X = yes    
    ;   
     	nl,
    	writeln("Invalid response. Please answer only with 'yes' or 'no'."),
        nl,
        ask(Q)
    ).

validate_response(X) :-
     X == yes ; X == no.

clean :- retractall(q(_,_)).