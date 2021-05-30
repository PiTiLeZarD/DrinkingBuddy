# DrinkingBuddy

The aim of this project is to eventually be a react native app where you can just casually track your drinks and it tells you very accurately your blood level.

It's more of a toy project (I have too many of these) but I'd like to dig deeper in the maths, and the phrarmacokinetics involved.

So far: If you input your details you'll get:

-   BMI
-   Blood volume (3 ways of determine that, so an average of the 3)
-   A couple of tools to convert Standard Drinks to alcohol content (and the other way around)
-   a vertical graph based on an very poor algebra formula. (that's where all the work is)

TODO List:

-   work on the math involved to have a linear elimination of the alcohol assuming absorption time is 0. (most apps do that, I don't like it but it's a good starting point)
-   work on a cumulative effect, try to figure out the liver saturation level and take into account ethnicity and drinking habits. (other details too) adding a second drink should be different than adding the 12th one
-   have an absoption/distribution/metabolism/excretion phases
-   do multiple projections and a graph that shows the most likely scenario. (with hints as to when can you drive depending on age and all, also breastfeeding?)

Reading material:

-   https://www.intmath.com/blog/mathematics/math-of-drugs-and-bodies-pharmacokinetics-4098
-   https://en.wikipedia.org/wiki/Alcohol_(drug)#:~:text=The%20oral%20bioavailability%20of%20ethanol,the%20dose%20of%20ethanol%20administered.
-   https://www.researchgate.net/publication/333219749_Alcohol_its_absorption_distribution_metabolism_and_excretion_in_the_body_and_pharmacokinetic_calculations
