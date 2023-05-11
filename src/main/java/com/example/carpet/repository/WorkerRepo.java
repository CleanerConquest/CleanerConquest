package com.example.carpet.repository;

import com.example.carpet.models.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface WorkerRepo extends JpaRepository<Worker, Long> {
    @Query(value = "SELECT * FROM worker WHERE ((first_name LIKE %?1% OR last_name LIKE %?2% )AND worker.unemployment_at=null) LIMIT ?3", nativeQuery = true)
    List<Worker> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName, int limit);

    @Query(value = "SELECT `worker`.* FROM `worker` LEFT JOIN `orders` ON `worker`.`id`=`orders`.`worker_id` where (`orders`.`order_status` IN(\"WAITING\",\"IN_TREATMENT\") OR `orders`.`order_status` IS NULL)AND `worker`.`unemployment_at` IS NULL GROUP BY `worker`.`id` ORDER BY COUNT(`worker`.`id`) ASC LIMIT 1", nativeQuery = true)
    Worker getWorkerWithLeastNumberOfOrders();

    Long countAllByEmployedAtLessThanEqualAndUnemploymentAtNull(Timestamp employedAt);

    List<Worker> findByUnemploymentAtIsNull();

}
