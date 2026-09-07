import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {GameEventModel} from '../../models/game-event.model';

@Injectable({
	providedIn: 'root',
})
export class GameWebSocketService {
	public connect(gameUuid: string): Observable<GameEventModel> {
		return new Observable<GameEventModel>(observer => {
			const socket = new WebSocket(this.buildUrl(gameUuid));

			socket.onmessage = event => {
				try {
					observer.next(JSON.parse(event.data) as GameEventModel);
				} catch (error) {
					observer.error(error);
				}
			};

			socket.onerror = () => observer.error(new Error('Game WebSocket connection failed.'));
			socket.onclose = () => observer.complete();

			return () => {
				if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
					socket.close();
				}
			};
		});
	}

	private buildUrl(gameUuid: string): string {
		if (/^https?:\/\//.test(environment.apiUrl)) {
			const apiUrl = new URL(environment.apiUrl);
			const protocol = apiUrl.protocol === 'https:' ? 'wss:' : 'ws:';
			const path = apiUrl.pathname.replace(/\/$/, '');

			return `${protocol}//${apiUrl.host}${path}/ws/games/${gameUuid}`;
		}

		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		const apiPath = environment.apiUrl.replace(/\/$/, '');

		return `${protocol}//${window.location.host}${apiPath}/ws/games/${gameUuid}`;
	}
}
