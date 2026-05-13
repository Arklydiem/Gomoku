# Roadmap

## Phase 1 — Project Architecture
- [ ] Define global architecture
- [ ] Define communication protocol between services
- [ ] Create repository structure
- [ ] Setup Docker environment
- [ ] Setup CI/CD and formatting tools

---

## Phase 2 — Java Game Server
- [ ] Create Spring Boot server
- [ ] Implement game state management
- [ ] Implement board representation
- [ ] Implement move validation
- [ ] Implement capture rules
- [ ] Implement double-three rule
- [ ] Implement endgame capture rule
- [ ] Implement victory conditions
- [ ] Add game timers
- [ ] Expose REST API

---

## Phase 3 — Display Server / Frontend
- [ ] Setup Angular project
- [ ] Create Goban rendering
- [ ] Implement player interactions
- [ ] Display captures and current player
- [ ] Display AI thinking timer
- [ ] Add move history
- [ ] Add game restart/reset
- [ ] Add debug panel

---

## Phase 4 — AI Service
- [ ] Create AI server
- [ ] Implement board parser
- [ ] Implement legal move generation
- [ ] Implement move simulation
- [ ] Implement heuristic evaluation
- [ ] Implement Minimax / Negamax
- [ ] Implement Alpha-Beta pruning
- [ ] Implement move ordering
- [ ] Implement iterative deepening
- [ ] Reach depth 10 search
- [ ] Optimize performances

---

## Phase 5 — Integration
- [ ] Connect Java server to AI service
- [ ] Validate AI moves server-side
- [ ] Add timeout handling
- [ ] Add fallback behavior
- [ ] Synchronize frontend with backend
- [ ] Add game synchronization tests

---

## Phase 6 — Debug & Tooling
- [ ] Add AI statistics
- [ ] Display explored nodes
- [ ] Display search depth
- [ ] Display heuristic score
- [ ] Add replay/debug tools
- [ ] Add benchmark scenarios

---

## Phase 7 — Testing
- [ ] Unit tests for rules
- [ ] Unit tests for captures
- [ ] Unit tests for double-threes
- [ ] AI legality tests
- [ ] Performance tests
- [ ] Stress tests
- [ ] Endgame validation tests

---

## Phase 8 — Optimization
- [ ] Reduce board evaluation cost
- [ ] Improve move ordering
- [ ] Optimize memory allocations
- [ ] Add transposition table
- [ ] Improve heuristic precision
- [ ] Reduce average move time below 500ms

---

## Bonus Ideas
- [ ] AI vs AI mode
- [ ] Spectator mode
