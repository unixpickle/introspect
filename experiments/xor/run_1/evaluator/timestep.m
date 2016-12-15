function [state, out, inVal, inGate, remGate, outGate] = timestep(in, inState, lastOut)
  inValB = [0.5740992662748529; 2.4438877682442577];
  inValP = [3.0855833218790685; -1.3641266196486197];
  inValW = [0.9192553663706601 0.7417048935502742 0.76136095194537; 5.546668802462084 -4.675154316856063 0.6470497106212298];
  inGateB = [0.12919429695728685; 2.184565095905981];
  inGateP = [1.7432904340549917; 2.2404971772673856];
  inGateW = [-0.896086636542169 -0.4509338643350975 0.6684045670734797; -5.1515085205764635 8.500243988993686 -0.5201827042342833];
  remGateB = [3.5221890922894055; -3.5478159233736593];
  remGateP = [-0.176469556238673; 0.3687201131444322];
  remGateW = [-3.6193760594826556 -3.2399590146811863 0.222161958521949; 2.9437807955505466 0.7008311106468095 -0.17566905261667842];
  outGateB = [1.9556668131287664; 3.2917624037938484];
  outGateP = [-2.078342032705483; 2.523912951962038];
  outGateW = [7.224094942020213 0.44545423496676617 0.02865876554925014; -5.486627762989016 8.271769265894644 -5.00216461764479];

  gateIn = [in; lastOut];

  inVal = tanh(inValW*gateIn + inValP.*inState + inValB);
  inGate = sigmoid(inGateW*gateIn + inGateP.*inState + inGateB);
  remGate = sigmoid(remGateW*gateIn + remGateP.*inState + remGateB);
  state = remGate.*inState + inGate.*inVal;
  outGate = sigmoid(outGateW*gateIn + outGateP.*state + outGateB);
  out = outGate .* tanh(state);
end

function [v] = sigmoid(x)
  v = 1./(1.+exp(-x));
end
