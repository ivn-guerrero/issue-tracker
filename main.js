// https://medium.com/codingthesmartway-com-blog/pure-javascript-building-a-real-world-application-from-scratch-5213591cfcd6
const ISSUES_KEY = "issues";

const buildIssueMarkup = (id, description, severity, assignedTo, status) => {
  return `
    <div class="accordion-item">
      <h2 class="accordion-header" id="heading-${id}">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-${id}"
          aria-expanded="true"
          aria-controls="collapse-${id}"
        >
          <div class="row">
            <div class="col">
              <span class="d-inline-block text-truncate description">
                ${description}
              </span>
            </div>
            <div class="col">
              <span class="fw-bold">${assignedTo}</span>
            </div>
          </div>
        </button>
      </h2>
      <div
        id="collapse-${id}"
        class="accordion-collapse collapse"
        aria-labelledby="heading-${id}"
        data-bs-parent="#issuesAccordion"
      >
        <div class="accordion-body">
          <p>
            <span class="fw-bold">Issue ID:</span>
            ${id}
          </p>
          <p>
            <span class="fw-bold">Assigned to:</span>
            ${assignedTo}
          </p>
          <p>
            <span class="fw-bold">Description:</span>
            ${description}
          </p>
          <p>
            <span class="fw-bold">Status:</span>
            ${status}
          </p>
          <p>
            <span class="fw-bold">Severity:</span>
            ${severity}
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
      </div>
    </div>
  `;
};

const fetchIssues = () => {
  let issues = JSON.parse(localStorage.getItem(ISSUES_KEY)) || [];
  let issuesList = document.getElementById("issuesAccordion");

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

/**
 * TODO
 * change the input for description to a textarea
 */