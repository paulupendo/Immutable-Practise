import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    
    describe('setEntries', () => {

        it('adds the entries to state', () => {
            const state = Map();
            // const entries = List.of("Transpioting", "All said and done");
            const entries = ["Transpioting", "All said and done"];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of("Transpioting", "All said and done")
            }));
        });

    });

    describe('next', () => {

        it('takes the next two entries under the vote', () => {
            const state = Map({
                entries: List.of("Transpioting", "All said and done", "Sunshine")
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair:  List.of("Transpioting", "All said and done")
                }),
                entries: List.of("Sunshine")
            }));
        });

        it('puts winner vote back into the entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of("Transpioting", "All said and done"),
                    tally: Map({'Transpioting' : 3, "All said and done" : 1})
                }), 
                entries: List.of("Billions", "SlumDog", "KenyaOne")
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Billions", "SlumDog")
                }),
                entries: List.of("KenyaOne", "Transpioting")
            }))
        });

        it('puts both from tied votes back into entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of("Transpioting", "All said and done"),
                    tally: Map({'Transpioting' : 3, "All said and done" : 3})
                }),
                entries: List.of("Billions", "SlumDog")
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Billions", "SlumDog")
                }),
                entries: List.of("Transpioting", "All said and done")
            }))
        });

        it('marks the winner when just one entry is left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of("Billions", "SlumDog"),
                    tally: Map({
                        "Billions": 3,
                        "SlumDog": 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: "Billions"
            }))
        });

    });

    describe('vote', () => {

        it('creates a tally for the voted entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of("Transpioting", "All said and done")
                }),
                entries: List()
            });
            const nextState = vote(state, 'Transpioting');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Transpioting", "All said and done"),
                    tally: Map({'Transpioting': 1})
                }),
                entries: List()
            }))
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of("Transpioting", "All said and done"),
                    tally: Map({'Transpioting' : 2, "All said and done" : 1})
                }),
                entries: List()
            });
            const nextState = vote(state, 'Transpioting');
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Transpioting", "All said and done"),
                    tally: Map({'Transpioting' : 3, "All said and done" : 1})
                }),
                entries: List()
            }))
        })
    })
    
})
