function getData() {
    loadXMLDoc();
    $("#editModal").hide();
    $("#confirmModal").hide();
    $("#insertModal").hide();
}

function loadXMLDoc() {
    var url = "http://localhost:8080/kasir_uts/api.php?method=getAllDataBarang";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
        if (xmlhttp.status == 200) {
            //document.getElementById("hasil").innerHTML = JSON.parse(xmlhttp.responseText);
            mydata = JSON.parse(xmlhttp.responseText);
            var size = Object.keys(mydata.data).length;
            var val ="";
            var no=1;
            for (var i=0; i<size; i++) {
                    val +='<tr>';
                    val +='<td>'+no+'</td>';
                    val +='<td id="Data_'+mydata.data[i].id_barang+'">'+mydata.data[i].nama_barang+'</td>';
                    val +='<td>'+mydata.data[i].harga+'</td>'
                    val +='<td align="center">';
                    val +='<button class="btn btn-xs btn-info" onclick="editData('+mydata.data[i].id_barang+')">'
                          +'<i class="fas fa-edit"></i>Edit</button>&nbsp;';
                    val +='<button class="btn btn-xs btn-warning" onclick="deleteData('+mydata.data[i].id_barang+')">'
                          +'<i class="fas fa-trash"></i>Hapus</button>';
                    val +="</td>";
                    val +="</tr>";
                    no++;
            }
            document.getElementById("hasil").innerHTML = val;

            //document.getElementById("hasil").innerHTML = xmlhttp.responseText;
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

function editData(id){
    let url = "http://localhost:8080/kasir_uts/api.php?method=getDataBarang&id="+id;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
          if (xmlhttp.status == 200) {
              //document.getElementById("hasil").innerHTML = JSON.parse(xmlhttp.responseText);
              mydata = JSON.parse(xmlhttp.responseText);
              document.getElementById("nama_brg").value = mydata.data[0].nama_barang;
              document.getElementById("id_brg").value = id;
              document.getElementById("hrg").value = mydata.data[0].harga;
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

    document.getElementById("editModal").style.display = "block";
}

function closeEditModal(){
    document.getElementById("editModal").style.display = "none";
}


function updateData(){
    var brg = document.getElementById("nama_brg").value;
    var hr = document.getElementById("hrg").value;
    var id = document.getElementById("id_brg").value;
    
    const dataUpdate = new Object();
    dataUpdate.nama_barang = brg;
    dataUpdate.id = id;
    dataUpdate.harga = hr;
    dataUpdate.success = 1;
    //const hasil = Object.assign({success:1}, data);
    //document.getElementById("kat_buku").value = JSON.stringify(dataUpdate);

    let url = "http://localhost:8080/kasir_uts/api.php?method=UpdateDataBarang";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
            if (xmlhttp.status == 200) {
                //document.getElementById("kat_buku").value = xmlhttp.responseText;                  
                var modal = document.getElementById("editModal");
                modal.style.display = "none";
                document.getElementById("Data_"+id).innerHTML=brg;
                
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else with status'+xmlhttp.status);
            }
          }
      };
    
    xmlhttp.send(JSON.stringify(dataUpdate));
    window.location.reload();
    // document.location.href=result+'-notif=deleteSuccess';
    // document.getElementById("Data_"+id).innerHTML(id_brg);
  }

function deleteData(id){
       let url = "http://localhost:8080/kasir_uts/api.php?method=DeleteDataBarang&id="+id;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
              if (xmlhttp.status == 200) {

            }
              else if (xmlhttp.status == 400) {
                  alert('There was an error 400');
              }
              else {
                  alert('something else with status'+xmlhttp.status);
              }
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
        window.location.reload();
}

function tambahData(){
    document.getElementById("insertModal").style.display = "block";
}

function insertData(){
    var nama_barang = document.getElementById("nama_barang").value; 
    var harga = document.getElementById("harga").value; 
    const dataInsert = new Object();
      dataInsert.nama_barang = nama_barang;
      dataInsert.harga = harga;
      dataInsert.success =1;
      
    let url = "http://localhost:8080/kasir_uts/api.php?method=InsertDataBarang";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
          if (xmlhttp.status == 200) {      
            mydata = JSON.parse(xmlhttp.responseText);
            document.getElementById("nama_barang").value = mydata.data[0].nama_barang;
            document.getElementById("harga").value = mydata.data[1].harga;
        
        }
          else if (xmlhttp.status == 400) {
              alert('There was an error 400');
          }
          else {
              alert('something else with status'+xmlhttp.status);
          }
        }
    };
    xmlhttp.send(JSON.stringify(dataInsert));
    var modal = document.getElementById("insertModal");
    modal.style.display = "none";
    window.location.reload();
    Swal.fire({icon: 'success',title: 'success',text: 'Barang telah berhasil ditambahkan'}).then((result) => {window.location.reload();})
}

function closeInsertModal(){
    document.getElementById("insertModal").style.display = "none";
}
  

function searchData(){
    var keyword =  document.getElementById("kata_kunci").value
      let url = "http://localhost:8080/kasir_uts/api.php?method=SearchDataBarang&keyword="+keyword;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
          if (xmlhttp.status == 200) {
              mydata = JSON.parse(xmlhttp.responseText);
              var size = Object.keys(mydata.data).length;
              var val ="";
              var no=1;
              for (var i=0; i<size; i++) {
                      val +='<tr>';
                      val +='<td>'+no+'</td>';
                      val +='<td id="Data_'+mydata.data[i].id_barang+'">'+mydata.data[i].nama_barang+'</td>';
                      val +='<td>'+mydata.data[i].harga+'</td>'
                      val +='<td align="center">';
                      val +='<button class="btn btn-xs btn-info" onclick="editData('+mydata.data[i].id_barang+')">'
                            +'<i class="fas fa-edit"></i>Edit</button>&nbsp;';
                      val +='<button class="btn btn-xs btn-warning" onclick="deleteData('+mydata.data[i].id_barang+')">'
                            +'<i class="fas fa-trash"></i>Hapus</button>';
                      val +="</td>";
                      val +="</tr>";
                      no++;
  
                      // val = val + mydata.data[i].nama_barang +"<br>";
              }
              document.getElementById("hasil").innerHTML = val;
  
              //document.getElementById("hasil").innerHTML = xmlhttp.responseText;
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