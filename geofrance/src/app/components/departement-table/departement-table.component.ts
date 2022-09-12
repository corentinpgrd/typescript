import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

 
@Component({
  selector: 'app-departement-table',
  templateUrl: './departement-table.component.html',
  styleUrls: ['./departement-table.component.css']
})
export class DepartementTableComponent implements OnInit {
  faSearch = faSearch;
  // Permet de gérer les entrées et sorties dans la balise HTML de commune.component.html
  @Input() departements: Departement[] = [];
  @Input() departementsIsLoading: boolean = false;
  @Input() departementsIsLoaded: boolean = false;
  @Output() loadDepartements: EventEmitter<{}> = new EventEmitter();
  @Output()  loadCommunes: EventEmitter<string> = new EventEmitter();
  
  search: string ="" // input de la barre de recherche
  currentPage: number = 1

  constructor() { }

  ngOnInit(): void {
  }

// Permet d'obtenir la longueur du tableau départements et de convertir en minuscule les données pour permettre la comparaison
  getLength(): number{
    return this.departements
    .filter(departement =>
       departement.nom.toLowerCase().includes(this.search.toLowerCase()) ||
       departement.code.includes(this.search))
    .length;
  }

  getDepartements(): Departement[]{
    return this.departements
    .filter(departement => 
      departement.nom.toLowerCase().includes(this.search.toLowerCase()) ||
      departement.code.includes(this.search))
    .slice((this.currentPage - 1) * 10, this.currentPage * 10)
  }
}