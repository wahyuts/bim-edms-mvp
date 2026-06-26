import { pool } from "../database/mysql.js";
import { notificationRepository } from "../repositories/notification.repository.js";

export async function getDashboard(userId) {
  const [documentRows] = await pool.execute(
    `SELECT
      COUNT(*) AS totalDocuments,
      SUM(status = 'Approved') AS approvedDocuments,
      SUM(status = 'Final As-Built') AS finalAsBuiltDocuments,
      SUM(sla_status = 'At Risk') AS atRiskDocuments,
      SUM(sla_status = 'Overdue') AS overdueDocuments
    FROM documents
    WHERE deleted_at IS NULL`
  );

  const [auditRows] = await pool.execute(
    `SELECT a.*, u.username, u.full_name
    FROM audit_trail a
    LEFT JOIN users u ON u.id = a.user_id
    ORDER BY a.created_at DESC
    LIMIT 5`
  );

  const [storageRows] = await pool.execute(
    `SELECT COUNT(*) AS totalRepositories
    FROM repositories
    WHERE deleted_at IS NULL`
  );

  return {
    kpi: documentRows[0],
    slaSummary: {
      atRisk: Number(documentRows[0]?.atRiskDocuments || 0),
      overdue: Number(documentRows[0]?.overdueDocuments || 0),
    },
    notifications: {
      unread: await notificationRepository.countUnread(userId),
    },
    recentAudit: auditRows,
    storageSummary: storageRows[0],
  };
}
