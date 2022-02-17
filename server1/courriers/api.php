<?php
ini_set("allow_url_fopen",true);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once('lib/mysql.php');

switch($_SERVER['REQUEST_METHOD'])
{
    case 'PUT' :
         error_log("PUT");
        $data = file_get_contents('php://input', false , stream_context_get_default(), 0, $_SERVER['CONTENT_LENGTH'] );
        // $source = fopen("php://input", "r");
        //$content = fread($source, 1024);
        // parse_str($content, $data);
        $_PUT = json_decode($data, true);
        $data = $_PUT;
       
        // error_log("PUT DATA:");
        // error_log(implode("*****************************",$_PUT));
        break;
        
    case 'DELETE' :
        // error_log("DELETE");
        $data = array();
        // parse_str(file_get_contents('php://input', false , stream_context_get_default(), 0, $_SERVER['CONTENT_LENGTH'] ), $data);
        parse_str(file_get_contents('php://input', false , stream_context_get_default(), 0), $data);
        $_DELETE = $data;
        break;

    case 'POST' :
        // error_log("POST");
        $data = $_POST;
        break;

    default :
        // error_log("GET");
        $data = $_GET;
}

$error = 0;

$URI = $_SERVER['REQUEST_URI'];
if(strpos($URI,'?') !== false)
{
    $URI = explode('?',$URI)[0];
}
$URI = trim(explode('/api/',$URI)[1]);

if(($error = ($URI != '') ? $error : $error +1) == 0);
{
    $URI = explode('/',$URI);

    $context = (isset($URI[0])) ? $URI[0] : '';

    $error = ($context != '') ? $error : $error +2;
}

if($error == 0)
{
    $db = new DB();

    // ----------------------------------------------------
    $contexts1 = [];
    array_push($contexts1, "courrier");
    array_push($contexts1, "utilisateur");
    array_push($contexts1, "destinataire");

    $contexts2 = [];
    array_push($contexts2, "courriers");
    array_push($contexts2, "utilisateurs");
    array_push($contexts2, "destinataires");

    // ----------------------------------------------------
    $tables = [];
    $tables['connexion'] = 'utilisateurs';

    $tables['courriers']       = 'courriers';
    $tables['courrier']        = 'courriers';
    $tables['courriers_liste'] = 'list_courriers';

    $tables['destinataires']       = 'destinataires';
    $tables['destinataire']        = 'destinataires';
    $tables['destinataires_liste'] = 'list_destinataires';

    $tables['utilisateurs'] = 'utilisateurs';
    $tables['utilisateur']  = 'utilisateurs';

    // ----------------------------------------------------
    $error1 = 0;
    $error2 = 0;

    // === VERSION ========================================

    if (count($URI) == 1 && $context == "version") 
    {
        $error1 = 1;
        error_log("$context $error1");
        print(json_encode(["version" => "1.0"]));
    }

    // === CONNEXION ======================================

    if(count($URI) == 1 && $context == "connexion" && isset($_SERVER['PHP_AUTH_USER']) && $_SERVER['REQUEST_METHOD'] == 'GET')
    {
        $error1 = 2;
        error_log("$context $error1");

        $data['identifiant']  = trim($_SERVER['PHP_AUTH_USER']);
        $data['mot_de_passe'] = trim($_SERVER['PHP_AUTH_PW']);

        error_log(json_encode($data));

        if(($error2 = ($data['identifiant'] != '' && $data['mot_de_passe'] != '') ? 0 : 1) == 0)
        {
            $SQL = "SELECT `id`, `nom`, `prenom` FROM `utilisateurs` WHERE `identifiant`=? AND `mot_de_passe`=? AND `status`=\"Activé\" LIMIT 0,1;";
            error_log($SQL);
            $record = $db->SQL($SQL, $data, 'ASSOC');
            error_log(json_encode($record[0], JSON_FORCE_OBJECT));
            print(json_encode($record[0], JSON_FORCE_OBJECT));
        }
    }

    // === PROFIL =======================================
    if(count($URI) == 2 && $_SERVER['REQUEST_METHOD'] == 'GET' && $context == 'utilisateur')
    {
        if(in_array($context, $contexts1))
        {
            $uid = (ctype_digit($URI[1])) ? $URI[1] : 0;
            if(($error2 = ($uid > 0) ? 0 : 1) == 0)
            {
                $error1 = 10;
                error_log("$context $error1");

                $table  = $tables[$context];
                $fields = $db->fields[$table];
                $FIELDS = $db->arrayToSQL($fields,', ','value');

                $SQL = "SELECT $FIELDS FROM `$table` WHERE `id`=? LIMIT 0,1;";  
                $record = $db->SQL($SQL, ['id'=>$uid], 'NUM');
                error_log(json_encode($record, JSON_FORCE_OBJECT));
                print(json_encode($record));
            }
        }
    }

    // === LISTE ==========================================
    // Exemple : api/courriers/liste/uid
    if(count($URI) == 3 && $_SERVER['REQUEST_METHOD'] == 'GET')
    {
        if(in_array($context, $contexts2))
        {
            if(isset($tables[$context.'_'.$URI[1]]))
            {
                $error1 = 3;
                error_log("$context $error1");

                $uid = (ctype_digit($URI[2])) ? $URI[2] : 0;
                if(($error2 = ($uid > 0) ? 0 : 1) == 0)
                {
                    $table  = $tables[$context.'_'.$URI[1]];
                    $fields = $db->fields[$table];
                    $FIELDS = $db->arrayToSQL($fields,', ','value');
    
                    $SQL = [];
                    $SQL['courriers']     = "SELECT $FIELDS FROM `$table` WHERE `utilisateur_id`=? AND `status`<>\"Supprimé\" ORDER BY `date_modification` DESC, `date_envoi` DESC;";
                    $SQL['destinataires'] = "SELECT $FIELDS FROM `$table` WHERE `utilisateur_id`=? AND `status`<>\"Supprimé\";";
                    $records = $db->SQL($SQL[$context], ['utilisateur_id'=>$uid], 'ASSOC');
                    print(json_encode($records));
                }
            }
        }
    }

    // === 1 RECORD =======================================
    // Exemple : api/courrier/uid/id
    if(count($URI) == 3 && $_SERVER['REQUEST_METHOD'] == 'GET')
    {
        if(in_array($context, $contexts1))
        {
            $uid = (ctype_digit($URI[1])) ? $URI[1] : 0;
            $id  = (ctype_digit($URI[2])) ? $URI[2] : 0;
            if(($error2 = ($uid > 0 && $id > 0) ? 0 : 1) == 0)
            {
                $error1 = 4;
                error_log("$context $error1");

                $table  = $tables[$context];
                $fields = $db->fields[$table];
                $FIELDS = $db->arrayToSQL($fields,', ','value');

                $SQL = "SELECT $FIELDS FROM `$table` WHERE `utilisateur_id`=? AND `id`=? LIMIT 0,1;";  
                $record = $db->SQL($SQL, ['utilisateur_id'=>$uid, 'id'=>$id], 'NUM');
                error_log(json_encode($record, JSON_FORCE_OBJECT));
                print(json_encode($record));
            }
        }
    }

    // === MULTIPLE RECORDS ===============================
    // Exemple : api/courriers/uid/id-id
    if(count($URI) == 3 && $_SERVER['REQUEST_METHOD'] == 'GET')
    {
        if(in_array($context, $contexts2))
        {
            $uid = (ctype_digit($URI[1])) ? $URI[1] : 0;
            $ids = (ctype_digit(str_replace('-','',$URI[2]))) ? trim($URI[2]) : '';
            if(($error2 = ($uid > 0 && $ids != '') ? 0 : 1) == 0)
            {
                $error1 = 5;
                error_log("$context $error1");

                $ids = explode('-',$ids);
                if(($error2 = (count($ids) > 0) ? $error2 : $error2 +2) == 0)
                {
                    $table  = $tables[$context];
                    $fields = $db->fields[$table];
                    $FIELDS = $db->arrayToSQL($fields,', ','value');

                    $records = [];
                    foreach($ids as $id)
                    {
                        $SQL = "SELECT $FIELDS FROM `$table` WHERE `utilisateur_id`=? AND `id`=? LIMIT 0,1;";  
                        $record = $db->SQL($SQL, ['utilisateur_id'=>$uid, 'id'=>$id], 'ASSOC');
                        array_push($records,$record[0]);
                    }
                    print(json_encode($records, JSON_FORCE_OBJECT));
                }
            }
        }
    }

    // === ADD ============================================
    if(count($URI) == 3 && $_SERVER['REQUEST_METHOD'] == 'POST')
    {
        if(in_array($context, $contexts1) && $URI[1] == 'ajouter')
        {
        $uid = (ctype_digit($URI[2])) ? $URI[2] : 0;
            if(($error2 = ($uid > 0) ? 0 : 1) == 0)
            {
            $error1 = 6;
            error_log("$context POST");
            
            $table = $tables[$context];
            
            $_POST['utilisateur_id'] = $uid;
            
            if ($context == "courrier")
            {
            $date = date('Y-m-d');
            $_POST['date_creation'] = $date;
            $_POST['date_modification'] = $date;
            }
            
            $SET = $db->arrayToSQL($_POST);
            $SQL = "INSERT INTO $table SET $SET;";
            error_log($SQL);
            $affected = $db->SQL($SQL, $_POST, 'ASSOC');
            print(json_encode(['affected'=>$affected], JSON_FORCE_OBJECT));
            }
        }
    }

    // === ADD USER ============================================
    if(count($URI) == 2 && $_SERVER['REQUEST_METHOD'] == 'POST')
    {
        if(in_array($context, $contexts1) && $URI[1] == 'ajouter')
        {
            $error1 = 11;
            
            error_log("$context POST");

            $_POST['status']= "Activé";

            $table = $tables[$context];
            
            $SET = $db->arrayToSQL($_POST);
            $SQL = "INSERT INTO $table SET $SET;";
            error_log($SQL);
            $affected = $db->SQL($SQL, $_POST, 'ASSOC');
            print(json_encode(['affected'=>$affected], JSON_FORCE_OBJECT));
        }
    }

    // === UPDATE =========================================
    if(count($URI) == 4 && $_SERVER['REQUEST_METHOD'] == 'PUT')
    {
        if(in_array($context, $contexts1) && $URI[1] == 'modifier')
        {
            $uid = (ctype_digit($URI[2])) ? $URI[2] : 0;
            $id  = (ctype_digit($URI[3])) ? $URI[3] : 0;
            if(($error2 = ($uid > 0 && $id > 0) ? 0 : 1) == 0)
            {
                $error1 = 10;

                $table = $tables[$context];

                $date = date('Y-m-d');

                $SET= $db->arrayToSQL($_PUT);
                error_log("SET:");
                error_log($SET);

                $_PUT['utilisateur_id'] = $uid;
                $_PUT['id'] = $id;

                $SQL = "UPDATE `$table` SET $SET WHERE `utilisateur_id`=? AND `id`=?;"; 
                error_log("JSON_ENCODE PUT:");
                error_log($SQL);
                $affected = $db->SQL($SQL, $_PUT);
                print(json_encode(['affected'=>$affected]));
            }
        }
    }
    
    // === UPDATE PROFIL==================================
    if(count($URI) == 3 && $_SERVER['REQUEST_METHOD'] == 'PUT')
    {
        error_log("modif profil");
        if(in_array($context, $contexts1) && $URI[1] == 'modifier')
        {
            $uid = (ctype_digit($URI[2])) ? $URI[2] : 0;
            if(($error2 = ($uid > 0) ? 0 : 1) == 0)
            {
                $error1 = 7;

                $table = $tables[$context];

                $date = date('Y-m-d');

                if ($_PUT['mot_de_passe'] != '') 
                {
                    $confirmation_mdp = $_PUT['confirmation_mot_de_passe'];
                    $ancien_mdp = $_PUT['ancien_mot_de_passe'];

                    unset($_PUT['confirmation_mot_de_passe']);
                    unset($_PUT['ancien_mot_de_passe']);

                    $SET= $db->arrayToSQL($_PUT);

                    $SQL_mdp = "SELECT `mot_de_passe` FROM `utilisateurs` WHERE `id`=$uid;";                
                    $control_mdp = $db->SQL($SQL_mdp)[0][0];

                    if ($control_mdp == $ancien_mdp) 
                    {
                        $SQL = "UPDATE `$table` SET $SET WHERE `id`=$uid AND `mot_de_passe`=$ancien_mdp"; 

                        $affected = $db->SQL($SQL, $_PUT);
                        print(json_encode(['affected'=>$affected]));
                    }
                    else{
                        print('Ancien mot de passe erroné');
                    }
                }
                if($_PUT['mot_de_passe'] == '')
                {
                    unset($_PUT['mot_de_passe']);
                    $SET= $db->arrayToSQL($_PUT);

                    $SQL = "UPDATE `$table` SET $SET WHERE `id`=$uid"; 
                    $affected = $db->SQL($SQL, $_PUT);
                    print(json_encode(['affected'=>$affected]));
                }
            }
        }
    }

    // === DELETE 1 RECORD ================================
    if(count($URI) == 4 && $_SERVER['REQUEST_METHOD'] == 'DELETE')
    {
        if(in_array($context, $contexts1) && $URI[1] == 'supprimer')
        {
            error_log($context);

            $uid = (ctype_digit($URI[2])) ? $URI[2] : 0;
            $id  = (ctype_digit($URI[3])) ? $URI[3] : 0;
            if(($error2 = ($uid > 0 && $id > 0) ? 0 : 1) == 0)
            {
                $error1 = 8;
                error_log("$context DELETE");

                $table = $tables[$context];

                $SQL = "UPDATE `$table` SET `status`=\"Supprimé\" WHERE `utilisateur_id`=? AND `id`=?;";  
                $affected = $db->SQL($SQL, ['utilisateur_id'=>$uid, 'id'=>$id], 'ASSOC');
                print(json_encode(['affected'=>$affected], JSON_FORCE_OBJECT));
            }
        }
    }

    // === DELETE MULTIPLE RECORDS ========================
    if(count($URI) == 4 && $_SERVER['REQUEST_METHOD'] == 'DELETE')
    {
        if(in_array($context, $contexts2) && $URI[1] == 'supprimer')
        {
            $uid = (ctype_digit($URI[2])) ? $URI[2] : 0;
            $ids = (ctype_digit(str_replace('-','',$URI[3]))) ? trim($URI[3]) : '';
            if(($error2 = ($uid > 0 && $ids != '') ? 0 : 1) == 0)
            {
                $error1 = 9;
                error_log("$context DELETE");

                $ids = explode('-',$ids);
                if(($error2 = (count($ids) > 0) ? $error2 : $error2 +2) == 0)
                {
                    $table = $tables[$context];

                    $affected = 0;
                    foreach($ids as $id)
                    {
                        $SQL = "UPDATE `$table` SET `status`=\"Supprimé\" WHERE `utilisateur_id`=? AND `id`=?;";  
                        $affected += $db->SQL($SQL, ['utilisateur_id'=>$uid, 'id'=>$id], 'ASSOC');
                    }
                    print(json_encode(['affected'=>$affected], JSON_FORCE_OBJECT));
                }
            }
        }
    }

    if($error1 == 0 && $error2 > 0)
    {
        print(json_encode(['error'=>"$error1.$error2"]));
    }    
}
else
{
    print(json_encode(['error'=>$error]));
}
