#Concept

## Consigne
    Les technologies
    Voici les technologies que vous allez devoir utiliser :

    HTML
    CSS
    Git
    GitHub (ou autre service au choix)
    JavaScript
    

    Présentation
    Pour ce projet-passerelle, vous êtes amené à construire un jeu du pendu.

    Le but de ce jeu est très facile à comprendre : tentez de deviner le mot secret en entrant des lettres une par une au clavier / ou en cliquant sur une des 26 lettres de l'alphabet. Ne gaspillez pas vos coups, car si trop de vos choix sont erronés vous tuerez le pendu et vous perdrez la partie. Le joueur dispose de six à onze chances avant de tuer le pendu (selon vos préférences).

    Pour ce projet, vous devrez aussi permettre au joueur de proposer un mot à tout moment pour le mot secret sur lequel il joue : si le mot est bon il gagne sinon il perd un coup.

    Ainsi, voici pour chaque manche les possibilités :

    - Le joueur clique sur une lettre de l'alphabet / écrit une lettre de l'alphabet (encore une fois, libre à vous de décider ce que vous souhaitez proposer). ++
        - La lettre est présente dans le mot proposé :
            - Toutes les lettres "e" (par exemple si le joueur propose "e") sont affichées sur le mot secret et le joueur passe à la manche d'après. ++
         - La lettre est introuvable dans le mot proposé :
           -  Le joueur perd un coup ; ++
           -  Le motif du pendu change ; ++
           -  Si le pendu est tué, le joueur perd. ++
    - Le joueur propose un mot.
        - Le mot est bien le mot qu'il faut trouver
            - Le joueur gagne ++
        - Le mot est différent
            - Le joueur perd un coup ; ++
            - Le motif du pendu change ; ++
            - Si le pendu est tué, le joueur perd. ++

    Dans votre processus de création artistique, vous être libre de choisir n'importe quel style de pendu. Il en existe de nombreux sur internet, vous pouvez aussi créer votre propre pendu sur des logiciels comme paint.

    Bien évidemment le mot doit changer à chaque partie : il vous faudra avoir une liste de mots et en choisir un de façon aléatoire avant de demander une lettre au joueur.

    Vous êtes obligé d'utiliser git et GitHub (ou autre service au choix) : lorsque vous enverrez votre projet, vous devrez également envoyer le lien de votre repository.


## Idée :
- Un bouton pour chaque lettre desactivé la lettre une fois proposé ++
- Animation du pendu ! pendu uniquement en css ?
