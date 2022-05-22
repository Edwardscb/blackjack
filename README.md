# blackjack
Blackjack game I made over the weekend while bored at the lake.

They had no internet connection so I decided to see if I could make this without looking at any online resources.
Made minor adjustments once home - like adding comments and instead of using my hidden class for cards that had been played and were no 
longer needed - I made a loop to just remove them from the DOM.  Decided to leave it as-is for now.

Made on my Samsung Galaxy S8 using Droidscript

Uses:
Javascript
HTML
CSS

Images I had on my phone for years because I was going to try this a few years ago with C++ but never got around to it

Currently it still has at least 2 bugs:
1) if a player is dealt 21 - the 'you win' message will alert before the cards can be seen
2) if you are dealt an Ace in your first two cards, it will not re-calculate it and change it from an 11 to a 1 
(if you are dealt an ace after the first two cards it will dynamically recalculate it)

I don't have any intention of fixing this or taking it any farther at this point, it was purely a self-challenge to 
see if I could do it myself in spare time over the weekend.
