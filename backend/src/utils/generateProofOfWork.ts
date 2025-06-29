import crypto from 'crypto';

export const generateProofOfWork = ({
  agentId,
  contractId,
  userId,
  timestamp,
  payload,
}: {
  agentId: string;
  contractId: string;
  userId: number;
  timestamp: string;
  payload: any;
}) => {
  const data = JSON.stringify({
    agentId,
    contractId,
    userId,
    timestamp,
    payload,
  });

  const hash = crypto.createHash('sha256').update(data).digest('hex');

  return hash;
};
