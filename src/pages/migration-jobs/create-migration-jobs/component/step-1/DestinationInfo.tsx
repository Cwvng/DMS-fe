export const DestinationInfo = () => {
  return (
    <div className="overflow-auto h-160">
      <div className="font-semibold">Database version</div>
      The destination database must must have the same database engine as source database
      <br />
      <div className="font-semibold">One time migration/fulldump</div>
      To perform a one time migration/fulldump, the user account used to connect to the destination
      database must have the necessary MySQL replication privilege. Configure this account to accept
      connections from anywhere (host = %). Access can be restricted to this user in a later step.
      To limit the possibility of compromising other aspects of the database, it is encouraged to
      create a separate account for this purpose The user account that you configure must have the
      following privileges:
      <ul>
        <li>
          <a>SELECT</a>
        </li>
        <li>
          <a>INSERT</a>
        </li>
        <li>
          <a>CREATE</a>
        </li>
        <li>
          <a>DROP</a>
        </li>
        <li>
          <a>RELOAD</a>
        </li>
        <li>
          <a>REFERENCES</a>
        </li>
        <li>
          <a>ALTER</a>
        </li>
        <li>
          <a>CREATE ROUTINE</a>
        </li>
        <li>
          <a>CREATE VIEW</a>
        </li>
        <li>
          <a>TRIGGER</a>
        </li>
      </ul>
      <li>
        <a>Learn more about privileges</a>
      </li>
      <li>
        <a>Learn more about user accounts</a>
      </li>
      <div className="font-semibold">Continuous migration/replication </div>To perform a continuous
      migration/replication, the user account used to connect to the source database must have the
      above privileges as for fulldump and additionally the following permissions:
      <ul>
        <li>
          <a>UPDATE</a>
        </li>
        <li>
          <a>DELETE </a>
        </li>
      </ul>
    </div>
  );
};
