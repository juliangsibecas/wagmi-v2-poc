import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import type { Register } from "wagmi";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, status, variables } = useConnect();
  const { chains } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const [chainId, setChainId] = useState<
    Register["config"]["state"]["chainId"]
  >(chains[0].id);

  return (
    <div>
      <div>
        {isConnected ? null : (
          <div>
            choose chain :
            {chains.map((x) => (
              <button
                disabled={x.id === chainId}
                key={x.id}
                onClick={() => setChainId(x.id)}
              >
                {x.name}
              </button>
            ))}
            <br />
          </div>
        )}
        choose wallet :
        {connectors
          .filter((x) => x.id !== connector?.id)
          .map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector, chainId })}
            >
              {connector.name}
              {variables?.connector === connector &&
                status === "pending" &&
                " (connecting)"}
            </button>
          ))}
        {isConnected && (
          <div>
            <br />
            <button onClick={() => disconnect()}>
              Disconnect from {connector?.name}
            </button>
          </div>
        )}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}
