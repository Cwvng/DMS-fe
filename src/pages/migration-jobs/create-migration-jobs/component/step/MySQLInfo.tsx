export const MySQLInfo = () => {
  return (
    <div className="overflow-auto">
      <div className="font-semibold">MySQL source</div>
      During the initial full dump phase DDL operations on the source may break the migration
      process. Make sure to stop all DDL operations when the migration status changes to Running |
      Full dump in progress
      <div className="font-semibold mt-3">Database version</div>
      <ul>
        <li>The source database must be running MySQL version 5.5, 5.6, 5.7 or 8</li>
      </ul>
      <div className="font-semibold mt-3">Continuous migration/replication</div>
      <ul>
        <li>
          To perform a continuous migration/replication, the user account used to connect to the
          source database must have the necessary MySQL <a>replication privilege</a>.
        </li>
        <li>
          Configure this account to accept connections from anywhere (host = %). Access can be
          restricted to this user in a <a>later step</a>. To limit the possibility of compromising
          other aspects of the database, it is encouraged to create a separate account for this
          purpose
        </li>
      </ul>
      the user account that you configure must have the following privileges:
      <ul>
        <li>
          <a>REPLICATION SLAVE</a>
        </li>
        <li>
          <a>EXECUTE</a>
        </li>
        <li>
          <a>SELECT</a>
        </li>
        <li>
          <a>SHOW VIEW</a>
        </li>
        <li>
          <a>REPLICATION CLIENT</a>
        </li>
        <li>
          <a>RELOAD</a>
        </li>
        <li>
          <a>TRIGGER</a>
        </li>
        <li>
          <a>Learn more about privileges</a>
        </li>
        <li>
          <a>Learn more about user accounts</a>
        </li>
        <li>
          To perform a continuous migration/replication, binary logging must be enabled on the
          source database, binary logging type must be set to row-based, and retention set to a
          minimum of 2 days (we recommend 7 days to minimize the likelihood of lost log position).{' '}
          <a>Learn more</a>
        </li>
        <li>All tables (except tables in system databases) use the InnoDB storage engine</li>
        <a>Learn more about InnoDB</a>
        <br />
        <a>Learn more about converting to InnoDB</a>
      </ul>
    </div>
  );
};
