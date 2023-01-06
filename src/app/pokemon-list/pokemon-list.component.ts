import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  pokemons: any[] = [];
  testArr : any;

  constructor(
    private dataService: DataService
  ) {
    this.dataService.getPokemons()
    .subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.dataService.getMoreData(result.name)
          .subscribe((uniqResponse: any) => {
            this.pokemons.push(uniqResponse);
          });
      })
    });
   }

  ngOnInit(): void {
    console.log(this.pokemons);
      
  }

  getColor(index:number){
    const typeArr = this.pokemons[index].types;
    let color = 'black';
    for (let typeIndex = 0; typeIndex < typeArr.length; typeIndex++) {
      // console.log(this.pokemons[index].name ,typeArr[typeIndex]);
      if(this.pokemons[index].types[typeIndex].type.name === 'grass'){
        color = 'green';
      }
      if(this.pokemons[index].types[typeIndex].type.name === 'fire'){
        color = 'red';
      }
      if(this.pokemons[index].types[typeIndex].type.name === 'water'){
        color = 'blue';
      }
      if(this.pokemons[index].types[typeIndex].type.name === 'flying'){
        color = 'gray';
      }
    }
    return color;
  }

}
