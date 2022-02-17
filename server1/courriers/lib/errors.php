<?php
    class Errors
    {
        public $messages;
        public $code;
        public $text;

        public function __construct()
        {
            $this->code = 0;
            $this->text = '';
            
        }

        public function check($value,$messageIndex)
        {
            
            global $page;
            if($value == false)
            {
                $this->code+= $messageIndex;
                $this->text = str_replace($this->messages["$page->current"][$messageIndex],'',$this->text);
                $this->text.= "\n".$this->messages[$page->current][$messageIndex];
                $this->text = trim($this->text);
                error_log("=================================");
                //print_r($this->messages[$page->current][$messageIndex]);
                error_log("=================================");
                if($this->code & 32768)
                {
                    header("Location: index.php");
                }
            }
            return($value);
        }

        public function getMessages($page,$code)
        {
            $messages = "";
            $i=1;
            foreach($this->messages[$page] as $error)
            {
               
                if($code & $i)
                {
                    error_log($i);
                    $messages = str_replace($error,'',$messages);
                    $messages.= "\n".$error;
                    $messages = trim($messages);
                }
                $i *= 2;
            }

            return($messages);
        }
    }

    $errors = new Errors();

    $errors->messages['connecter'][1]  = "Le champ de l'identifiant est vide.";
    $errors->messages['connecter'][2]  = "Le champ de l'identifiant est vide.";
    $errors->messages['connecter'][4]  = "Le champ du mot de passe est vide.";
    $errors->messages['connecter'][8]  = "Le champ du mot de passe est vide.";
    $errors->messages['connecter'][16] = "Identifiant ou mot de passe incorrect.";

    $errors->messages['formulaire'][1] = "Vous ne pouvez modifier qu'un seul courrier à la fois.";
    $errors->messages['formulaire'][2] = "Vous devez choisir au moins un courrier à modifier.";
    $errors->messages['formulaire'][4] = "Vous ne pouvez pas modifier ce courrier il a été envoyé.";
    $errors->messages['formulaire'][8] = "Vous ne pouvez pas supprimer ce courrier il a été envoyé.";


    $errors->messages['destinataire_formulaire'][1] = "Vous ne pouvez modifier qu'un seul destinataire à la fois.";
    $errors->messages['destinataire_formulaire'][2] = "Vous devez choisir au moins un destinataire à modifier.";
    $errors->messages['destinataire_formulaire'][4] = "Vous ne pouvez pas supprimer ce ou ces destinataires un courrier est associé.";
    
   


    $errors->messages['liste'][32768] = "Accès interdit !";
    $errors->messages['utilisateur'][32768] = "Accès interdit !";

    $errors->messages['ajouter'][32768] = "Accès interdit !";

    