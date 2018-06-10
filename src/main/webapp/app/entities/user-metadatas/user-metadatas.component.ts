import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserMetadatas } from './user-metadatas.model';
import { UserMetadatasService } from './user-metadatas.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-metadatas',
    templateUrl: './user-metadatas.component.html'
})
export class UserMetadatasComponent implements OnInit, OnDestroy {
userMetadatas: UserMetadatas[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private userMetadatasService: UserMetadatasService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.userMetadatasService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<UserMetadatas[]>) => this.userMetadatas = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.userMetadatasService.query().subscribe(
            (res: HttpResponse<UserMetadatas[]>) => {
                this.userMetadatas = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserMetadatas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserMetadatas) {
        return item.id;
    }
    registerChangeInUserMetadatas() {
        this.eventSubscriber = this.eventManager.subscribe('userMetadatasListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}