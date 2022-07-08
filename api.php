<?php
$serverhost = "localhost";
$serverusername = "root"; 
$serverpassword = "";         
$serverdatabase = "kasir";
$koneksi = new mysqli($serverhost, $serverusername, $serverpassword, $serverdatabase);

$response = array();
if (isset($_GET['method'])){
    $method =$_GET['method'];
    switch($method){
        case "getAllDataBarang" :
            //get url situs
            $sql = "SELECT * FROM `barang`";
            $query = mysqli_query($koneksi, $sql);
            if(!empty($query)){
                $jumlah = mysqli_num_rows($query);
                if($jumlah>0){
                    $response["data"] = array();
                    while($hasil = mysqli_fetch_row($query)){
                    $data = array();
                    $data["id_barang"] = $hasil[0];  
                    $data["nama_barang"] = $hasil[1];
                    $data["harga"] = $hasil[2];                
                    // push data ke response array
                    array_push($response["data"], $data);
                    }
                    // success
                    $response["success"] = 1;
                    
                    // echoing JSON response
                    echo json_encode($response);
                }else{
                    //data tidak ditemukan
                    $response["success"] = 0;
                    $response["message"] = "Data Tidak Ditemukan"; 
                    // echoing JSON response
                    echo json_encode($response);
                }
            }else{
                //data tidak ditemukan
                $response["success"] = 0;
                $response["message"] = "Kesalahan Koneksi"; 
                // echoing JSON response
                echo json_encode($response);
            }
        break;
        case "InsertDataBarang" :   
            $response = json_decode(file_get_contents('php://input'),TRUE); 
            if($response['success']==1){
                $nama_barang = $response['nama_barang'];
                $harga = $response['harga'];
                $sql = "INSERT INTO barang (nama_barang,harga) VALUES ('$nama_barang','$harga')";
                mysqli_query($koneksi,$sql);
                echo "success";
            }      
        break;

        case "getDataBarang" :
            if (isset($_GET['id'])){
                $id = $_GET['id'];
                //get url situs
                $sql = "SELECT nama_barang, harga FROM barang WHERE id_barang='$id'";
                $query = mysqli_query($koneksi, $sql);
                if(!empty($query)){
                    $jumlah = mysqli_num_rows($query);
                    if($jumlah>0){
                    $response["data"] = array();
                    while($hasil = mysqli_fetch_row($query)){
                    $data = array();
                    $data["id_barang"] = $hasil[0];  
                    $data["nama_barang"] = $hasil[1];
                    $data["harga"] = $hasil[2];                
                    // push data ke response array
                    array_push($response["data"], $data);
                    }
                        // success
                        $response["success"] = 1;
                        
                        // echoing JSON response
                        echo json_encode($response);
                    }else{
                        //data tidak ditemukan
                        $response["success"] = 0;
                        $response["message"] = "Data Tidak Ditemukan"; 
                        // echoing JSON response
                        echo json_encode($response);
                    }
                }else{
                    //data tidak ditemukan
                    $response["success"] = 0;
                    $response["message"] = "Kesalahan Koneksi"; 
                    // echoing JSON response
                    echo json_encode($response);
                }

            }else{
                //data tidak ditemukan
                $response["success"] = 0;
                $response["message"] = "Terjadi Kesalahan Data"; 
                // echoing JSON response
                echo json_encode($response);
            }
        break;

        case "DeleteDataBarang" :
            if (isset($_GET['id'])){
                $id = $_GET['id'];
                //get url situs
                $sql = "DELETE FROM `barang` WHERE `id_barang`='$id'";
                $query = mysqli_query($koneksi, $sql);
                if(!empty($query)){
                        // success
                        $response["success"] = 1;
                        
                        // echoing JSON response
                        echo json_encode($response);
                }else{
                    //data tidak ditemukan
                    $response["success"] = 0;
                    $response["message"] = "Kesalahan Koneksi"; 
                    // echoing JSON response
                    echo json_encode($response);
                }

            }else{
                //data tidak ditemukan
                $response["success"] = 0;
                $response["message"] = "Terjadi Kesalahan Data"; 
                // echoing JSON response
                echo json_encode($response);
            }
        break;

        case "UpdateDataBarang" :   
            $response = json_decode(file_get_contents('php://input'),TRUE); 
            if($response['success']==1){
                $nama_barang = $response['nama_barang'];
                $harga = $response['harga'];
                $id = $response['id'];

                $sql = "UPDATE  `barang` SET `nama_barang`='$nama_barang',`harga`='$harga'
                         WHERE `id_barang`='$id'";
                $query = mysqli_query($koneksi, $sql);
                if(!empty($query)){
                        // success
                        $response["success"] = 1;                        
                        // echoing JSON response
                        echo json_encode($response);
                }else{
                    //data tidak ditemukan
                    $response["success"] = 0;
                    $response["message"] = "Kesalahan Koneksi"; 
                    // echoing JSON response
                    echo json_encode($response);
                }
                       
            }else{
                //data tidak ditemukan
                $response["success"] = 0;
                $response["message"] = "Terjadi Kesalahan Data"; 
                // echoing JSON response
                echo json_encode($response);
            }      
        break;

        default:
            $response["success"] = 0;
            $response["message"] = "Metode Request Salah";
            // echoing JSON response
            echo json_encode($response);
        break;
        case "SearchDataBarang" :
            if (isset($_GET['keyword'])){
                $katakunci = $_GET['keyword'];
                //get url situs
                $sql = "SELECT * FROM barang WHERE nama_barang LIKE '%".$katakunci."%'";
                $query = mysqli_query($koneksi, $sql);
                $jumlah = mysqli_num_rows($query);
                if($jumlah>0){
                    $response["data"] = array();
                    while($hasil = mysqli_fetch_row($query)){
                    $data = array();
                    $data["id_barang"] = $hasil[0];  
                    $data["nama_barang"] = $hasil[1];
                    $data["harga"] = $hasil[2];                
                    // push data ke response array
                    array_push($response["data"], $data);
                    }
                        // success
                        $response["success"] = 1;
                        
                        // echoing JSON response
                        echo json_encode($response);
                }else{
                    //data tidak ditemukan
                    $response["success"] = 0;
                    $response["message"] = "Kesalahan Koneksi"; 
                    // echoing JSON response
                    echo json_encode($response);
                }

            }else{
                //data tidak ditemukan
                $response["success"] = 0;
                $response["message"] = "Terjadi Kesalahan Data"; 
                // echoing JSON response
                echo json_encode($response);
            }
        break;

    }
}else{
    $response["success"] = 0;
    $response["message"] = "Metode Tidak Ada";
    // echoing JSON response
    echo json_encode($response);
}

?>