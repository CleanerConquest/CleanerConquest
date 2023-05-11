package com.example.carpet.services;

import com.example.carpet.models.Order;
import com.example.carpet.models.OrderStatus;
import com.example.carpet.models.Worker;
import com.example.carpet.payloads.request.WorkerReq;
import com.example.carpet.repository.OrderRepo;
import com.example.carpet.repository.WorkerRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class WorkerServImpl implements WorkerServ {

    @Autowired
    private WorkerRepo workerRepository;
    @Autowired
    private OrderRepo orderRepository;

    @Override
    public void saveWorker(Worker worker) {
        workerRepository.save(worker);
    }

    @Override
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    @Override
    public List<Worker> getWorkerByName(String name) {
        if (name.contains(" ")) {
            String[] names = name.split(" ");
            return workerRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(names[0], names[1], name.length() * 2);
        }
        return workerRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name, name.length() < 5 ? name.length() * 2 : 10);
    }

    @Override
    public Worker getWorkerWithLeastNumberOfOrders() {
        return workerRepository.getWorkerWithLeastNumberOfOrders();
    }

    @Override
    public Long getWorkerCountByDate(Timestamp date) {
        return workerRepository.countAllByEmployedAtLessThanEqualAndUnemploymentAtNull(date);
    }

    @Override
    public void unemployeWorkerById(long id) throws NoSuchElementException {
        Worker worker = workerRepository.findById(id).get();
        worker.setUnemploymentAt(Timestamp.valueOf(LocalDateTime.now()));
        workerRepository.save(worker);
        List<Order> orders = orderRepository.findByWorkerAndOrderStatusIn(worker, List.of(OrderStatus.WAITING, OrderStatus.IN_TREATMENT));
        if (orders != null) {
            for (Order order :
                    orders) {
                Worker newWorker = workerRepository.getWorkerWithLeastNumberOfOrders();
                if (newWorker != null) {
                    order.setWorker(newWorker);
                    orderRepository.save(order);
                }
            }
        }
    }

    @Override
    public List<Worker> findByUnemploymentAtIsNull() {
        return workerRepository.findByUnemploymentAtIsNull();
    }

    @Override
    public boolean updateWorker(Long id, WorkerReq workerReq) {
        Optional<Worker> optionalWorker = workerRepository.findById(id);
        if (optionalWorker.isPresent()) {
            Worker worker = optionalWorker.get();
            worker
                    .setFirstName(workerReq.getFirstName())
                    .setLastName(workerReq.getLastName())
                    .setPhoneNumber(workerReq.getPhoneNumber())
                    .setAddress(workerReq.getAddress());
            workerRepository.save(worker);
            return true;
        }
        return false;
    }
}
