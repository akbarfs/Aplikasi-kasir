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
            $sql = "SELECT `id_barang`,`nama_barang` FROM `barang`ORDER BY `nama_barang`";
            $query = mysqli_query($koneksi, $sql);
            if(!empty($query)){
                $jumlah = mysqli_num_rows($query);
                if($jumlah>0){
                    $response["data"] = array();
                    while($hasil = mysqli_fetch_row($query)){
                    $data = array();
                    $data["id_barang"] = $hasil[0];  
                    $data["nama_barang"] = $hasil[1];
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
                    // $data["id_barang"] = $hasil[0];  
                    $data["nama_barang"] = $hasil[0];
                    $data["harga"] = $hasil[1];                
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

        case "InsertDataTransaksi" :   
            $response = json_decode(file_get_contents('php://input'),TRUE); 
            if($response['success']==1){
                $total = $response['total'];
                $bayar = $response['bayar'];
                $kembalian = $response['kembalian'];
                $sql = "INSERT INTO transaksi (total,bayar,kembalian)
                VALUES ('$total','$bayar','$kembalian')";
                mysqli_query($koneksi,$sql);
                echo "success";
            }      
        break;

        case "getLastTransaksi" :
            sleep(1);
            $sql = "SELECT * FROM `transaksi` ORDER BY id DESC LIMIT 1";
            $query = mysqli_query($koneksi, $sql);
            $data = mysqli_fetch_array($query);
            if($data){
                echo $data["id"];
            }else{
                echo 0;
            }
        break;

        case "insertDetailTransaksi" :   
            $response = json_decode(file_get_contents('php://input'),TRUE); 
            if($response['success']==1){
                $id_barang = $response['id_barang'];
                $id_transaksi = $response['id_transaksi'];
                $jumlah = $response['jumlah'];
                $subtotal = $response['subtotal'];
                $sql = "INSERT INTO detail (id_barang,id_transaksi,jumlah,subtotal)
                VALUES ('$id_barang','id_transaksi','$jumlah','$subtotal')";
                mysqli_query($koneksi,$sql);
                echo "success";
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