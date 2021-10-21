import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hospedagem } from 'src/app/model/hospedagem.model';
import { Hospede } from 'src/app/model/hospede.model';
import { Quarto } from 'src/app/model/quarto.model';
import { HospedagemService } from 'src/app/service/hospedagem.service';
import { HospedeService } from 'src/app/service/hospede.service';
import { QuartoService } from 'src/app/service/quarto.service';

@Component({
  selector: 'app-hospedagem-form',
  templateUrl: './hospedagem-form.component.html',
  styleUrls: ['./hospedagem-form.component.css']
})
export class HospedagemFormComponent implements OnInit {

  titulo: string = "Cadastro de uma nova hospedagem";

  hospedagem: Hospedagem = {
    quarto: <Quarto>{},
    hospede: <Hospede>{},
    dtCheckin: new Date,
    dtCheckout: new Date
  };

  public quartos: Quarto[] = [];
  public hospedes: Hospede[] = [];

  constructor(
    private hospedagemService: HospedagemService,
    private quartoService: QuartoService,
    private hospedeService: HospedeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quartoService.findAll().subscribe(quartos =>{
      this.quartos = quartos;
    })
    this.hospedeService.findAll().subscribe(hospedes =>{
      this.hospedes = hospedes;
    })
  }

  salvar(): void{
    this.hospedagemService.create(this.hospedagem).subscribe( () =>{
      this.hospedagemService.showMessage("Hospedagem cadastrada com sucesso!");
      this.router.navigate(['/hospedagens']);
    })
  }

}
