package com.example.carpet.services;

import com.example.carpet.models.Worker;
import com.example.carpet.payloads.request.WorkerReq;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public interface WorkerServ {
    void saveWorker(Worker worker);

    List<Worker> getAllWorkers();

    List<Worker> getWorkerByName(String name);

    Worker getWorkerWithLeastNumberOfOrders();

    Long getWorkerCountByDate(Timestamp date);

    void unemployeWorkerById(long id);

    List<Worker> findByUnemploymentAtIsNull();
    boolean updateWorker(Long id, WorkerReq workerReq);
}
