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
  $("#codigo").val("");
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
              itemlista += "<option value='"+dados.codigo+"'>"+dados.titulo+"</option>"; 
            });
        $("#lista").html(itemlista);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
};

$(document).on("change", "#lista", function(){
  var codigoEscolhido = $("option:selected", ("#lista")).val();
  $.ajax({
    type: "post", //como enviar
    url: "https://cadlivros.000webhostapp.com/lista-um.php", //para onde enviar
    data: "codigo="+codigoEscolhido,
    dataType:"json",
    //se der certo
    success: function(data){
      $("#codigo").val(data.livro.codigo);
      $("#titulo").val(data.livro.titulo);
      $("#autor").val(data.livro.autor);
      $("#ano").val(data.livro.ano);
    },
    //se der errado
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

$(document).on("click", "#btnSalvarAlterar", function(){
  var parametros = {
    "codigo": $("#codigo").val(),
    "titulo": $("#titulo").val(),
    "autor": $("#autor").val(),
    "ano": $("#ano").val()
  };

  $.ajax({
    type: "post", //como enviar
    url: "https://cadlivros.000webhostapp.com/alterar.php", //para onde enviar
    data: parametros,
    dataType:"json",
    //se der certo
    success: function(data){
      navigator.notification.alert(data);
      desabilita();
      document.location.reload(true);
    },
    //se der errado
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

$(document).on("click", "#btnExcluir", function(){
  var codigoEscolhido = $("#codigo").val();
  $.ajax({
    type: "post",
    url: "https://cadlivros.000webhostapp.com/excluir.php",
    data: "codigo="+codigoEscolhido,
    dataType: "json",
    success: function(data){
      navigator.notification.alert(data);
      $("#codigo").val("");
      $("#titulo").val("");
      $("#autor").val("");
      $("#ano").val("");
      desabilita();
      document.location.reload(true);
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  })
});