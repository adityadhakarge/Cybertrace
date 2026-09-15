// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title CyberComplaint
 * @dev Store and track cybercrime complaints securely on the blockchain.
 * This ensures tamper-proof evidence and immutable tracking.
 */
contract CyberComplaint {
    struct Complaint {
        string id;
        string evidenceHash; // SHA-256 hash of the evidence files
        address filer;
        uint256 timestamp;
        string status; // Submitted, Verified, Investigating, Resolved
    }

    mapping(string => Complaint) public complaints;
    
    // Officers who have permission to update status
    mapping(address => bool) public authorizedOfficers;
    address public admin;

    event ComplaintFiled(string id, string evidenceHash, address filer, uint256 timestamp);
    event StatusUpdated(string id, string newStatus, uint256 timestamp);

    modifier onlyOfficer() {
        require(authorizedOfficers[msg.sender] || msg.sender == admin, "Not an authorized officer");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function authorizeOfficer(address officer) external {
        require(msg.sender == admin, "Only admin can authorize");
        authorizedOfficers[officer] = true;
    }

    /**
     * @dev File a new complaint with its evidence hash
     */
    function fileComplaint(string memory _id, string memory _evidenceHash) external {
        require(bytes(complaints[_id].id).length == 0, "Complaint ID already exists");
        
        complaints[_id] = Complaint({
            id: _id,
            evidenceHash: _evidenceHash,
            filer: msg.sender,
            timestamp: block.timestamp,
            status: "Submitted"
        });

        emit ComplaintFiled(_id, _evidenceHash, msg.sender, block.timestamp);
    }

    /**
     * @dev Update the status of an existing complaint
     */
    function updateStatus(string memory _id, string memory _newStatus) external onlyOfficer {
        require(bytes(complaints[_id].id).length > 0, "Complaint not found");
        
        complaints[_id].status = _newStatus;
        emit StatusUpdated(_id, _newStatus, block.timestamp);
    }

    /**
     * @dev Verify if a given evidence hash matches the stored hash
     */
    function verifyEvidence(string memory _id, string memory _evidenceHash) external view returns (bool) {
        require(bytes(complaints[_id].id).length > 0, "Complaint not found");
        return keccak256(bytes(complaints[_id].evidenceHash)) == keccak256(bytes(_evidenceHash));
    }
}
