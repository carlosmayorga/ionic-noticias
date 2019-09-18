import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private noticiasService: NoticiasService) {}

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = [
    'business', 'entertainment', 'general',
    'health', 'science', 'sports', 'technology'
  ];
  noticias: Article[] = [];

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value);
  }

  cambioCategoria( event ) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }

  /**
   *
   * Private and utils
   */

  private cargarNoticias(caterogia: string, event?) {
    this.noticiasService.getTopHeadLinesCategoria(caterogia)
    .subscribe( resp => {
      if ( resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push( ...resp.articles);

      if ( event ) {
        event.target.complete();
      }
    });
  }

}
