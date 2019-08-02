// This is a JavaScript file

function habilita(){
  $("#titulo").prop("readonly",false);
  $("#autor").prop("readonly",false);
  $("#ano").prop("readonly",false);
}

function desabilita(){
  $("#titulo").prop("readonly",true);
  $("#autor").prop("readonly",true);
  $("#ano").prop("readonly",true);
}

$(document).on("click", "#btnSalvar", function(){
  var parametros = {
    "livro": $("#titulo").val(),
    "autor": $("#autor").val(),
    "ano": $("#ano").val()
  }

  $.ajax({
    type:"post",//como enviar
    url:"https://cadlivros.000webhostapp.com/cadastra.php",//para onde enviar
    data: parametros,//o que enviar
    //se der certo
    success: function(data){
      navigator.notification.alert("Certo: "+data);
      $("#titulo").val(""),
      $("#autor").val(""),
      $("#ano").val(""),
      desabilita()
    },
    //se der errado
    error: function(data){
      navigator.notification.alert("Erro: "+data);
    }
  });

});

$(document).on("click", "#btnCancelar", function(){
  $("#titulo").val("");
  $("#autor").val("");
  $("#ano").val("");
  desabilita();
});

$(document).on("click", "#btnLista", function(){
  $(location).attr("href", "lista.html");
});

$(document).on("click", "#btnVoltar", function(){
  $(location).attr("href", "index.html");
});

function lista(){
   $.ajax({
        type:"post", //como enviar
        url:"https://cadlivros.000webhostapp.com/lista.php",//para onde enviar
        dataType:"json",
        //se der certo
        success: function(data){
            var itemlista = "";
            $.each(data.livro,function(i,dados){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>"; 
            });
        $("#lista").html(itemlista);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
};