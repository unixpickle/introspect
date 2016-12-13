(function() {

  function LSTMPane(data) {
    window.EditorPane.call(this);
    var inValWeights = data[0];
    var inValBiases = data[1];
    var inGateWeights = data[2];
    var inGateBiases = data[3];
    var remGateWeights = data[4];
    var remGateBiases = data[5];
    var outGateWeights = data[6];
    var outGateBiases = data[7];
    var initState = data[8];
    var inValPeep = data[9];
    var inGatePeep = data[10];
    var remGatePeep = data[11];
    var outGatePeep = data[12];

    this._stateSize = initState.length;
    this._inSize = inValWeights.length/this._stateSize - this._stateSize;

    var matrices = [inValWeights, inGateWeights, remGateWeights, outGateWeights];
    var biases = [inValBiases, inGateBiases, remGateBiases, outGateBiases];
    var peeps = [inValPeep, inGatePeep, remGatePeep, outGatePeep];

    this.element.append(this._vecField('InitState', initState));

    var names = ['In Val.', 'In Gate', 'Rem. Gate', 'Out Gate'];
    for (var i = 0; i < 4; i++) {
      this.element.append(this._vecField(names[i]+' Bias', biases[i]));
      this.element.append(this._vecField(names[i]+' Peephole', peeps[i]));
      this.element.append(this._matField(names[i]+' Weights', matrices[i]));
    }
  }

  LSTMPane.prototype = Object.create(window.EditorPane.prototype);
  LSTMPane.prototype.constructor = LSTMPane;

  LSTMPane.prototype._vecField = function(name, vec) {
    var field = $('<div></div>').addClass('vec-field');
    field.append($('<label></label>').text(name));
    field.append($('<button></button>').click(function() {
      var pane = new window.VectorPane(vec);
      this.onPush(pane);
    }.bind(this)).text('Edit'));
    return field;
  };

  LSTMPane.prototype._matField = function(name, mat) {
    var field = $('<div></div>').addClass('mat-field');
    field.append($('<label></label>').text(name));
    field.append($('<button></button>').click(function() {
      var pane = new window.MatrixPane(this._stateSize,
        this._inSize+this._stateSize, mat);
      this.onPush(pane);
    }.bind(this)).text('Edit'));
    return field;
  };

  window.paneRegistry.LSTM = LSTMPane;

})();