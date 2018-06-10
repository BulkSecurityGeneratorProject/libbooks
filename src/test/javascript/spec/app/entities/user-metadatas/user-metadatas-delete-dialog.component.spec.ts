/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LibBooksTestModule } from '../../../test.module';
import { UserMetadatasDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-metadatas/user-metadatas-delete-dialog.component';
import { UserMetadatasService } from '../../../../../../main/webapp/app/entities/user-metadatas/user-metadatas.service';

describe('Component Tests', () => {

    describe('UserMetadatas Management Delete Component', () => {
        let comp: UserMetadatasDeleteDialogComponent;
        let fixture: ComponentFixture<UserMetadatasDeleteDialogComponent>;
        let service: UserMetadatasService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LibBooksTestModule],
                declarations: [UserMetadatasDeleteDialogComponent],
                providers: [
                    UserMetadatasService
                ]
            })
            .overrideTemplate(UserMetadatasDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserMetadatasDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserMetadatasService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});