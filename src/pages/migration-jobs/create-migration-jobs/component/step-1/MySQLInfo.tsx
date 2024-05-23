export const MySQLInfo = () => {
  return (
    <div className="overflow-auto h-160">
      <div className="font-semibold">MySQL source</div>
      During the initial full dump phase DDL operations on the source may break the migration
      process. Make sure to stop all DDL operations when the migration status changes to Running |
      Full dump in progress
      <br />
      <div className="font-semibold mt-3">Database version</div>
      The source database must be running MySQL version 5.5, 5.6, 5.7 or 8 <br />
      <div className="font-semibold mt-3">One time migration/fulldump</div>
      To perform a one time migration/fulldump, the user account used to connect to the source
      database must have the necessary MySQL{' '}
      <a
        target="_blank"
        href="https://dev.mysql.com/doc/refman/8.0/en/replication-howto-repuser.html">
        replication privilege
      </a>
      <br />
      Configure this account to accept connections from anywhere (host = %). Access can be
      restricted to this user in a later step. To limit the possibility of compromising other
      aspects of the database, it is encouraged to create a separate account for this purpose
      <br /> The user account that you configure must have the following privileges:
      <ul>
        <li>
          <a>SELECT</a>
        </li>
        <li>
          <a>RELOAD</a>
        </li>
        <li>
          <a>LOCK TABLES</a>
        </li>
        <li>
          <a>SHOW VIEW</a>
        </li>
        <li>
          <a>TRIGGER</a>
        </li>
        <li>
          <a>REPLICATION CLIENT</a>
        </li>
        <li>
          <a
            target="_blank"
            href="  https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html">
            Learn more about privileges
          </a>
        </li>
        <li>
          <a href="https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql">
            Learn more about user accounts
          </a>
        </li>
      </ul>
      <br />
      <div className="font-semibold mt-3">Continuous migration/replication</div>
      To perform a continuous migration/replication, the user account used to connect to the source
      database must have the above privileges as for fulldump and additionally the following
      permissions:
      <ul>
        <li>
          <a>EXECUTE</a>
        </li>
        <li>
          <a> REPLICATION SLAVE</a>
        </li>
      </ul>
      To perform a continuous migration/replication, binary logging must be enabled on the source
      database, binary logging type must be set to row-based, and retention set to a minimum of 2
      days (we recommend 7 days to minimize the likelihood of lost log position).{' '}
      <a target="_blank" href="https://dev.mysql.com/doc/refman/8.0/en/binary-log.html">
        Learn more
      </a>
      <br />
      All tables (except tables in system databases) use the InnoDB storage engine{' '}
      <a target="_blank" href="https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html">
        Learn more about InnoDB
      </a>
      <br />
      <a
        target="_blank"
        href="https://dev.mysql.com/doc/refman/8.0/en/converting-tables-to-innodb.html">
        Learn more about converting to InnoDB
      </a>
    </div>
  );
};
