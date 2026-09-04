import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameHub} from './game-hub';

describe('GameHub', () => {
	let component: GameHub;
	let fixture: ComponentFixture<GameHub>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GameHub],
		}).compileComponents();

		fixture = TestBed.createComponent(GameHub);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
