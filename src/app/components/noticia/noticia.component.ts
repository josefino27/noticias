import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interface';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  constructor(private iab: InAppBrowser,
    public actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService,
  ) { }

  ngOnInit() { }

  lanzarNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
    return browser;
  }

  
  async lanzarMenu() {

    const noticiaEnFavo = this.storageService.noticiaEnFavo(this.noticia);
    
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir noticia',
        icon: 'share-social',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, {
        text: noticiaEnFavo ? 'Remover de favoritos' : 'Agregar a favoritos',
        icon: noticiaEnFavo ? 'star' : 'star-outline',

        handler: () => {
          this.storageService.saveRemoveNoticia(this.noticia)
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }
}
