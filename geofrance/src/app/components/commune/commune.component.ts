import { Component, OnInit} from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { HttpClient } from '@angular/common/http';
import { Commune } from 'src/app/models/commune.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css']
})
export class CommuneComponent implements OnInit {

  departements : Departement[] = []; // j'initialise un tableau pour stocker les données de l'API
  departementsIsLoading : boolean = false; // définir le chargement des informations
  departementsIsLoaded : boolean = false; // Les departements sont ils chargés ?
  communesForGraph: { name: string, value: number}[] = [];
  communes : Commune[] = [];
  communesIsLoading : boolean = true; // définir le chargement des informations
  communesIsLoaded : boolean = true;
  population : [] = []

// Pour réaliser un GET, je dois déclarer en PRIVATE le service HttpClient
  constructor(private HttpClient: HttpClient, private toastr: ToastrService) { }

 // Fonction qui permet le chargement des départements 
  loadDepartements(): void{
    this.departementsIsLoading = true;  // permet de gérer l'état de chargement ( spinner )
    // récupération des données de l'API grace à une requête GET
    this.HttpClient.get<Departement[]>("https://geo.api.gouv.fr/departements")
    .subscribe( // On doit Subscribe aux informations de l'API
      data => {
        this.toastr.success('Liste des départements chargée!','chargement ok')
        this.departements = data; // transfert des données de l'API dans mon tableau vide
        this.departementsIsLoading = false; // l'état de chargement est terminé , loading passe a "false"
        this.departementsIsLoaded = true; // Le bouton de chargement disparait
      }
    ) 
  }


  loadCommunes(codeDepartement : string): void{
    this.communesIsLoading = true;  // permet de gérer l'état de chargement ( spinner )
    // récupération des données de l'API grace à une requête GET
    this.toastr.success('Liste des communes chargée!','chargement ok')
    this.HttpClient.get<Commune[]>(`https://geo.api.gouv.fr/departements/${codeDepartement}/communes`)
    .subscribe( // On doit Subscribe aux informations de l'API
      data => {
        this.communesForGraph = data
        .filter(commune => commune.population > 10000 ) // Permet de gérer les données de l'api dans l'objet/tableau pour le graph
        .map(commune=>{
          return{
            name : commune.nom,
            value : commune.population
            
          }
        })
        this.communes = data; // transfert des données de l'API dans mon tableau vide
        this.communesIsLoading = false; // l'état de chargement est terminé , loading passe a "false"
        this.communesIsLoaded = true; // Le bouton de chargement disparait
        
      }
    ) 
  }
  

  ngOnInit(): void {
  }

}


