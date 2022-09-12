import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Commune } from 'src/app/models/commune.model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-commune-table',
  templateUrl: './commune-table.component.html',
  styleUrls: ['./commune-table.component.css']
})
export class CommuneTableComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  @Input() communes: Commune[] = [];
  @Input() communesIsLoading: boolean = false;
  @Input() communesIsLoaded: boolean = false;
  // @Output() loadCommunes: EventEmitter<{}> = new EventEmitter();


  search: string ="" // input de la barre de recherche
  currentPage: number = 1

  constructor() { }

  ngOnInit(): void {
  }


  getLength(): number{
    return this.communes
    .filter(commune => 
      commune.nom.toLowerCase().includes(this.search.toLowerCase()) ||
      commune.codesPostaux.includes(this.search))
      .length;
  }

  getCommunes(): Commune[]{
    return this.communes
    .filter(commune => 
      commune.nom.toLowerCase().includes(this.search.toLowerCase()) ||
      commune.codesPostaux.includes(this.search))
    .slice((this.currentPage - 1) * 10, this.currentPage * 10)
  }

  croissant():Commune[] {
    return this.communes
    .sort((a,b) => {
    return a.population - b.population})
    
  }

  decroissant():Commune[] {
    return this.communes
    .sort((a,b) => {
      return a.population - b.population})
    .reverse()
  }
}

