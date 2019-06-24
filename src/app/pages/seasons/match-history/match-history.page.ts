import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, scan } from 'rxjs/operators';
import { MatchService, CardQueryModel } from 'src/app/services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.page.html',
  styleUrls: ['./match-history.page.less']
})
export class MatchHistoryPage implements OnInit {

  constructor(private matchService: MatchService, private router: Router) { }
  
  matches$: Observable<any[]>;
  loadMore$ = new Subject<number>();

  skip: number = 0;
  take: number = 25;

  async ngOnInit() {
    this.matches$ = this.loadMore$
      .pipe(
        startWith(this.skip),
        switchMap((skip) => this.getMatches(skip)),
        scan((all, current) => {
          all = all.concat(current);
          return all;
        }, [])
      );
  }

  getMatches(skip: number) {
    return this.matchService.getWithQuery(new CardQueryModel(this.skip, this.take));
  }

  onScroll() {
    this.skip += this.take;
    this.loadMore$.next(this.skip);
  }

  goToMatch(id: string){
    this.router.navigate(['/match', id]);
  }
}