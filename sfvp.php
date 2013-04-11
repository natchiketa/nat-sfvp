<?php
header('Content-type: application/json');

if (! isset($_REQUEST['action']) ) {
    header('Bad Request', true, 400);
    echo json_encode(array('error' => "no action specified"));
    exit;
}

// ?action=md5dir
// Get a hash based on the directory listing. This is useful in order to
// determine whether there have been any changes, and avoid unnecessary calls
// to getID3.
if (isset($_GET['action']) && $_GET['action'] == 'md5dir') {
    $dir = './video';
    $files = scandir($dir);
    $dirMD5 = md5(serialize($files));
    echo json_encode($dirMD5);
    exit;
}

if ($_GET['action'] == 'getid3') {
    require_once('getid3/getid3.php');
    $getID3 = new getID3;
    $DirectoryToScan = './video'; // change to whatever directory you want to scan
    $dir = opendir($DirectoryToScan);
    $filesInfo = array();
    while (($file = readdir($dir)) !== false) {
        $FullFileName = realpath($DirectoryToScan.'/'.$file);
        if ((substr($FullFileName, 0, 1) != '.') && is_file($FullFileName)) {
            set_time_limit(30);
            $ThisFileInfo = $getID3->analyze($FullFileName);
            array_push($filesInfo, $ThisFileInfo);
        }
    }
    echo json_encode($filesInfo);
    exit;
}



