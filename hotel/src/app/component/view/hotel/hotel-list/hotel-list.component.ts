import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDeleteComponent } from 'src/app/component/template/confirm-delete/confirm-delete.component';
import { Hotel } from 'src/app/model/hotel.model';
import { HotelService } from 'src/app/service/hotel.service';


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hoteis: Hotel[] = [];
  displayedColumns: string[] = ["id", "nome", "endereco", "estrelas", "acoes"];
  dataSource!: MatTableDataSource<Hotel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( 
    private service: HotelService,
    private dialog: MatDialog

  ) { }

  atualizarDados(): void{
    console.log("Hotel initiated");
    this.service.findAll().subscribe(hoteis => {
      this.dataSource = new MatTableDataSource(hoteis);
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit(): void {
    this.atualizarDados();
  }

  delete(hotel: Hotel): void{
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        message: 'Deseja realmente excluir o/a ' + hotel.nmHotel + "?",
        buttonText: {
          ok: "Excluir",
          cancel: "Desistir"
        }
      }
    })
    dialogRef.afterClosed().subscribe((confirm: boolean) =>{
      if(confirm){
        this.service.delete(hotel).subscribe(() => {
          this.service.showMessage("Hotel excluido com sucesso");
          this.atualizarDados();
        });
      }
    })
  }
}
