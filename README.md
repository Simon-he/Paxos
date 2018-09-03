阶段一 预提案阶段： 提议者Proposer：向接受者Acceptor广播预提案，附带接下来提案Proposal的proposal_id 接受者Acceptor：收到预提案后更新a_proposal_id = max(proposal_id,a_proposal_id)，如果预提案的proposal_id>a_proposal_id，Acceptor回复记录的接受过的proposal_id最大的提案。 

阶段二 提案阶段： 提议者Proposer：等待直到收到大多数接受者对预提案的回复，从所有回复的提案组成的法定数目的提案集合K中挑选proposal_id最大的提案，以该提案的值作为本次提案的值。如果K是空集，那么可以给提案任意赋值。然后把该提案广播给接受者们，提案和预提案共享同一个proposal_id。 接受者Acceptor：如果收到的提案的proposal_id>= a.proposal_id，那么接受这个提案，更新a_proposal_id = max(proposal_id,a_proposal_id)，更新记录的提案。
