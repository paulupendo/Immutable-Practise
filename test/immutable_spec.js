import {expect} from 'chai';
import {List} from 'immutable';

describe('Immutable List', () => {

    function addMovie(currentState, movie) {
        return currentState.push(movie);
    }

    it('Is immutable', () => {
        let state = List.of("American Made", "Inhumans");
        let newState = addMovie(state, "PowerRangers");

        expect(state).to.equal(List.of("American Made", "Inhumans"));
        expect(newState).to.equal(List.of("American Made", "Inhumans", "PowerRangers" ));
    });

})