// https://medium.com/codingthesmartway-com-blog/pure-javascript-building-a-real-world-application-from-scratch-5213591cfcd6
const ISSUES_KEY = "issues";

const buildIssueMarkup = (id, desc, severity, assignedTo, status) => {
  return `
    <div class="well">
      <h6>Issue ID: ${id}</h6>
      <p>
        <span class="label label-info">
          ${status}
        </span>
      </p>
      <h3>${desc}</h3>
      <p>
      <span class="glyphicon glyphicon-time"></span>
        ${severity}
      <span class="glyphicon glyphicon-user"></span>
        ${assignedTo}
      </p>
      <a
        class="btn btn-warning"
        href="#"
        onclick="setStatusClosed('${id}')"
      >
        Close
      </a>
      <a
        class="btn btn-danger"
        href="#"
        onclick="deleteIssue('${id}')"
      >
        Delete
      </a>
    </div>
  `;
};

const fetchIssues = () => {
  let issues = JSON.parse(localStorage.getItem(ISSUES_KEY)) || [];
  let issuesList = document.getElementById("issuesList");

  issuesList.innerHTML = "";

  for (let issue of issues) {
    const { id, description, severity, assignedTo, status } = issue;
    issuesList.innerHTML += buildIssueMarkup(
      id,
      description,
      severity,
      assignedTo,
      status
    );
  }
};

const saveIssue = (e) => {
  const issueId = chance.guid();
  const issueDesc = document.getElementById("issueDescInput").value;
  const issueSeverity = document.getElementById("issueSeverityInput").value;
  const issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  const issueStatus = "Open";

  const issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  if (!localStorage.getItem(ISSUES_KEY)) {
    const issues = [];
    issues.push(issue);
    localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
  } else {
    const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
    issues.push(issue);
    localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
};

const setStatusClosed = (id) => {
  let issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
  issues = issues.map((i) => i.id === id ? {...i, status: 'Closed'} : i);
  localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = (id) => {
  let issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
  issues = issues.filter((i) => i.id !== id);
  localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
  fetchIssues();
}

document.getElementById("issueInputForm").addEventListener("submit", saveIssue);
