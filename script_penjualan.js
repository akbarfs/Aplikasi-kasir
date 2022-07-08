function getData() {
    dataBarang();
}

function dataBarang(){
var url = "http://localhost:8080/kasir_uts/api_penjualan.php?method=getAllDataBarang";
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
    if (xmlhttp.status == 200) {
        document.getElementById("item").innerHTML = JSON.parse(xmlhttp.responseText);
        mydata = JSON.parse(xmlhttp.responseText);
        var size = Object.keys(mydata.data).length;
        let val ='<option value="">- Pilih Barang -</option>';
        for (i=0; i<size; i++) {
            val +='<option id="id_brg" value="'+mydata.data[i].id_barang+'">'+mydata.data[i].nama_barang+'</option>';
        }
    document.getElementById("item").innerHTML = val;
    }
    else if (xmlhttp.status == 400) {
        alert('There was an error 400');
    }
    else {
        alert('something else with status'+xmlhttp.status);
    }
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function tambahData(){
    // var id = document.getElementById("item").value;
    var id = $("#item").val();
    let url = "http://localhost:8080/kasir_uts/api_penjualan.php?method=getDataBarang&id="+id;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
          if (xmlhttp.status == 200) {
            mydata = JSON.parse(xmlhttp.responseText);
            var val="";        
            //   val +='<tr>';
              val +='<td>'+mydata.data[0].nama_barang+'</td>';
              val +='<td id="hr'+id+'">'+mydata.data[0].harga+'</td>';
              val +='<td class="text-center"><div class="jumlah"><input type="number" class="form-control" id="quantity" name="quantity" min="1" max="50" value="1" onchange="hitungSub('+id+')"></div></td>';
              val +='<td class="text-right"><div class="subtotal" id="sub'+id+'" >'+mydata.data[0].harga+'</div></td>';
              val +='<td class="text-center"><button class="btn btn-xs btn-warning" onclick="deleteData('+id+')"><i class="fas fa-trash"></i></button></td>';
            //   val +='</tr>';
            var tr = document.createElement('tr');
            tr.innerHTML = val;
            tr.id ="tr"+id;
            tr.className="items";
            };
            var cart = document.getElementById("hasil2");
            cart.appendChild(tr);
            totalbayar();

          }
          else if (xmlhttp.status == 400) {
              alert('There was an error 400');
          }
          else {
              alert('something else with status'+xmlhttp.status);
          }
        }
    xmlhttp.open("POST", url, true);
    xmlhttp.send();
}

function deleteData(id){
    document.getElementById("tr"+id).remove();
}

function hitungSub(id){
var harga = mydata.data[0].harga;
// var harga = document.getElementById("hr").value;
var jumlah = document.getElementById("quantity").value;
var hasil = harga * jumlah;
document.getElementById("sub"+id).innerHTML = hasil;
totalbayar();

}

function totalbayar(){
    var total =0;
    $(".subtotal").each(function(){
        // total = parseInt(total)+parseInt($(this).text());
        total += parseInt(this.innerHTML);
        //console.log(total);
    });

    document.getElementById("total").value = total;    
    document.getElementById("total").innerHTML = total;    

}

function kembalian(){
    var total = document.getElementById("total").value;
    var bayar = document.getElementById("bayar").value;
    // var total =$("#total").val();
    // var bayar =$("#bayar").val();
    var kembali = bayar-total;
    document.getElementById("kembalian").innerHTML = kembali;    
    document.getElementById("kembalian").value = kembali;    
}

function reset(){
    window.location.reload();
}

function simpanDataTransaksi(){
    var total = document.getElementById("total").value;
    var bayar = document.getElementById("bayar").value;
    var kembalian = document.getElementById("kembalian").value;
    
    const insertData = new Object();
    insertData.total = total;
    insertData.bayar = bayar;
    insertData.kembalian = kembalian;
    insertData.success = 1;

    let url = "http://localhost:8080/kasir_uts/api_penjualan.php?method=InsertDataTransaksi";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
            if (xmlhttp.status == 200) {
                mydata = JSON.parse(xmlhttp.responseText);
                document.getElementById("total").value = mydata.data[0].total;
                document.getElementById("bayar").value = mydata.data[1].bayar;
                document.getElementById("kembalian").value = mydata.data[2].kembalian;
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else with status'+xmlhttp.status);
            }
          }
      };
      xmlhttp.send(JSON.stringify(insertData));
    window.location.reload();
    simpanDetailTransaksi();
}

function simpanDetailTransaksi(){
    $('.items').each(function(){
    var id_barang = this.id.replace("tr","");
    var jumlah = $(this).find('td .jumlah').val();
    var subtotal = $(this).find('.subtotal').html();
    
    var xlhttp = new XMLHttpRequest();
    xlhttp.open('GET',"http://localhost:8080/kasir_uts/api_penjualan.php?method=getLastTransaksi",true);
    xlhttp.onreadystatechange = function(){
        if(xlhttp.readyState == XMLHttpRequest.DONE){
            var id_transaksi = parseInt(xlhttp.responseText);
            console.log("id_barang "+id_barang+", jumlah "+jumlah+", subtotal "+subtotal+", id_transaksi "+id_transaksi+"");
            
            const insertData = new Object();
            insertData.id_barang = id_barang;
            insertData.jumlah = jumlah;
            insertData.subtotal = subtotal;
            insertData.id_transaksi = id_transaksi;
            insertData.success = 1;
            
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST',"http://localhost:8080/kasir_uts/api_penjualan.php?method=insertDetailTransaksi",true);
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState == XMLHttpRequest.DONE){
                    if(xmlhttp.status == 200){
                        mydata = JSON.parse(xmlhttp.responseText);
                        document.getElementById("id_brg").value = mydata.data[0].id_barang;
                        document.getElementById("total").value = mydata.data[1].id_transaksi;
                        document.getElementById("jumlah").value = mydata.data[2].jumlah;
                        document.getElementById("subtotal").value = mydata.data[3].subtotal;        

                    }else if(xmlhttp.status == 400){
                        alert('There was an error 400');
                    }else {
                        alert('something else with status'+xmlhttp.status);
                    }
                }
            };
        xmlhttp.send(JSON.stringify(insertData));
        }
    }
    xlhttp.send(null);
});
}