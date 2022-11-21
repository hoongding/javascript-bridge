const Bridge = require("../Model/Bridge");
const { BRIDGE_DIRECTION } = require("../constants/GameCondition.js");
/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge = [];
  #bridge_map = new Bridge();
  #step = 0;
  setBridge(bridge) {
    // bridge 설정.
    this.#bridge = bridge;
  }

  getBridge() {
    return this.#bridge;
  }

  increaseStep() {
    this.#step += 1;
  }
  getCurrentMap() {
    return this.#bridge_map.getTotalBridge();
  }
  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   * return : 성공하면 true, 성공안하면 false
   */
  move(cmd) {
    const step = this.#step;
    const currentBridge = this.#bridge[step];
    if (currentBridge === BRIDGE_DIRECTION.DOWN) {
      this.#bridge_map.upBridge.push(currentBridge === cmd ? "O" : "X");
      this.#bridge_map.downBridge.push(" ");
    }
    if (currentBridge === BRIDGE_DIRECTION.UP) {
      this.#bridge_map.downBridge.push(currentBridge === cmd ? "O" : "X");
      this.#bridge_map.upBridge.push(" ");
    }
    this.increaseStep();
    return this.checkSuccess(cmd, currentBridge);
  }

  checkSuccess(cmd, currentBridge) {
    if (cmd === currentBridge) return true;
    if (cmd !== currentBridge) return false;
  }
  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {}
}

module.exports = BridgeGame;
