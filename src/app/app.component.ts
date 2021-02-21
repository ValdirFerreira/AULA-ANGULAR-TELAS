import { Component } from '@angular/core';
import { Service } from '../app/Service/AppService';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetoAngular';
  tokenUsser: string = "";

  displayedColumns: string[] = ['Id', 'Nome'];
  dataSource: any;

  constructor(public AppService: Service) {
  }

  profileForm = new FormGroup({
    nome: new FormControl('', Validators.required),
  });

  ngOnInit() {
   this.GerarToken();
  }


  onSubmit() {

    debugger

    console.warn(this.profileForm.value);

    var inputNome = this.profileForm.value["nome"];
    this.CadastrarProdutos(inputNome);
  }


  GerarToken() {
    this.AppService.GerarToken().toPromise().then((res) => {
      debugger
      this.tokenUsser = res;
      this.Listar();
    })
  }


  Listar() {
    this.AppService.ListaProdutos(this.tokenUsser)
      .toPromise()
      .then((produtos) => {
        var listaDeProdutos: any;
        listaDeProdutos = produtos;
        debugger
        this.dataSource = listaDeProdutos;
      })
      .catch((err) => {

        debugger
        var erros = err;
      });
  }

  CadastrarProdutos(nome: any) {

    var produto =
    {
      Id: 0,
      Nome: nome,
      Imagem: ""
    };

    this.AppService.InsereProduto(produto, this.tokenUsser)
      .toPromise()
      .then((okk) => {
        var ok = okk;
        this.Listar();
        this.limpaCampos();
      })
      .catch((err) => {
        debugger
        var erros = err;
      });

  }


  limpaCampos() {
    this.profileForm.patchValue({
      nome: '',
    });
  }

  carregarTela() {
    this.profileForm.patchValue({
      nome: 'Teste Campo',
    });
  }


}
